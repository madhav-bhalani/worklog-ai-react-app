import axios, {
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { z } from "zod";

import { notifyTerminalAuthFailure } from "@/lib/api/auth-failure";
import type { ApiSuccessEnvelope } from "@/lib/api/api.types";
import { normalizeApiError } from "@/lib/api/normalize-api-error";
import { env } from "@/lib/env/env";

const AUTH_REFRESH_PATH = "/api/v1/auth/refresh";
const MUTATION_METHODS = new Set(["patch", "post", "put"]);
const retriedRequests = new WeakSet<InternalAxiosRequestConfig>();

const successEnvelopeSchema = z.object({
  error: z.literal(false),
  statusCode: z.number().int(),
  message: z.string(),
  data: z.unknown(),
});

const axiosClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": env.SERVER_API_KEY,
  },
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "x-api-key": env.SERVER_API_KEY,
  },
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;
let hasNotifiedTerminalAuthFailure = false;

function wrapMutationPayload(config: InternalAxiosRequestConfig) {
  const method = config.method?.toLowerCase();

  if (
    method &&
    MUTATION_METHODS.has(method) &&
    config.data !== undefined &&
    !config.worklog?.isPayloadWrapped
  ) {
    const payload: unknown = config.data;
    config.data = { data: payload };
    config.worklog = {
      ...config.worklog,
      isPayloadWrapped: true,
    };
  }

  return config;
}

async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post(AUTH_REFRESH_PATH)
      .then(() => {
        hasNotifiedTerminalAuthFailure = false;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

function notifyTerminalAuthFailureOnce() {
  if (hasNotifiedTerminalAuthFailure) return;

  hasNotifiedTerminalAuthFailure = true;
  notifyTerminalAuthFailure();
}

axiosClient.interceptors.request.use(wrapMutationPayload);

axiosClient.interceptors.response.use(undefined, async (error: unknown) => {
  if (!axios.isAxiosError(error) || error.response?.status !== 401) {
    throw error;
  }

  const originalRequest = error.config;

  if (
    !originalRequest ||
    originalRequest.worklog?.skipAuthRefresh ||
    originalRequest.url === AUTH_REFRESH_PATH ||
    retriedRequests.has(originalRequest)
  ) {
    throw error;
  }

  retriedRequests.add(originalRequest);

  try {
    await refreshSession();
    return await axiosClient.request(originalRequest);
  } catch {
    notifyTerminalAuthFailureOnce();
    throw error;
  }
});

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await axiosClient.request<ApiSuccessEnvelope<T>>(config);
    const parsedEnvelope = successEnvelopeSchema.safeParse(response.data);

    if (!parsedEnvelope.success) {
      throw new Error("The server returned an invalid success envelope.");
    }

    return response.data.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}
