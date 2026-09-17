import { apiRequest } from "@/lib/api/api-client";

import {
  authResponseSchema,
  type AuthResponse,
  type LoginRequest,
  type RegisterRequest,
} from "@/features/auth/types/auth.types";
import { ApiError } from "@/lib/api/api-error";

async function parseAuthResponse(
  response: Promise<unknown>,
): Promise<AuthResponse> {
  const data = await response;
  const parsedResponse = authResponseSchema.safeParse(data);

  if (!parsedResponse.success) {
    throw new ApiError({
      category: "unexpected",
      message: "The server returned an invalid authentication response.",
    });
  }

  return parsedResponse.data;
}

export function login(request: LoginRequest) {
  return parseAuthResponse(
    apiRequest<unknown>({
      method: "POST",
      url: "/api/v1/auth/login",
      data: request,
      worklog: { skipAuthRefresh: true },
    }),
  );
}

export function register(request: RegisterRequest) {
  return parseAuthResponse(
    apiRequest<unknown>({
      method: "POST",
      url: "/api/v1/auth/register",
      data: request,
      worklog: { skipAuthRefresh: true },
    }),
  );
}

export function refreshSession() {
  return parseAuthResponse(
    apiRequest<unknown>({
      method: "POST",
      url: "/api/v1/auth/refresh",
      worklog: { skipAuthRefresh: true },
    }),
  );
}

export function logout() {
  return apiRequest<unknown>({
    method: "POST",
    url: "/api/v1/auth/logout",
    worklog: { skipAuthRefresh: true },
  });
}
