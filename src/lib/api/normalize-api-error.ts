import axios from "axios";
import { z } from "zod";

import { ApiError, type ApiErrorCategory } from "@/lib/api/api-error";

const apiErrorEnvelopeSchema = z.object({
  error: z.literal(true),
  statusCode: z.number().int(),
  errorType: z.string(),
  message: z.string().min(1),
  data: z.null(),
});

function getCategory(status: number): ApiErrorCategory {
  if (status === 400 || status === 422) return "validation";
  if (status === 401) return "session-expired";
  if (status === 403) return "forbidden";
  if (status === 404) return "not-found";
  if (status === 409) return "state-conflict";
  if (status >= 500) return "server";
  return "unexpected";
}

function getFallbackMessage(status: number) {
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You do not have permission to do that.";
  if (status === 404) return "The requested resource could not be found.";
  if (status >= 500) return "The server could not complete the request.";
  return "The request could not be completed.";
}

function getDevelopmentCause(error: unknown) {
  return import.meta.env.DEV ? error : undefined;
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  const cause = getDevelopmentCause(error);

  if (axios.isCancel(error)) {
    return new ApiError({
      category: "cancelled",
      message: "The request was cancelled.",
      ...(cause === undefined ? {} : { cause }),
    });
  }

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return new ApiError({
        category: "network",
        message:
          "Unable to reach the server. Check your connection and try again.",
        isNetworkError: true,
        ...(cause === undefined ? {} : { cause }),
      });
    }

    const status = error.response.status;
    const parsedEnvelope = apiErrorEnvelopeSchema.safeParse(
      error.response.data,
    );

    return new ApiError({
      category: getCategory(status),
      message: parsedEnvelope.success
        ? parsedEnvelope.data.message
        : getFallbackMessage(status),
      status,
      ...(parsedEnvelope.success
        ? { errorType: parsedEnvelope.data.errorType }
        : {}),
      ...(cause === undefined ? {} : { cause }),
    });
  }

  return new ApiError({
    category: "unexpected",
    message: "An unexpected error occurred.",
    ...(cause === undefined ? {} : { cause }),
  });
}
