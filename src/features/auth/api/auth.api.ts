import { apiRequest } from "@/lib/api/api-client";
import { authApiPaths } from "@/lib/api/api-paths";
import { env } from "@/lib/env/env";

import {
  authResponseSchema,
  type AuthResponse,
  type ForgotPasswordRequest,
  type LoginRequest,
  type RegisterRequest,
  type ResetPasswordRequest,
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
      url: authApiPaths.login,
      data: request,
      worklog: { skipAuthRefresh: true },
    }),
  );
}

export function register(request: RegisterRequest) {
  return parseAuthResponse(
    apiRequest<unknown>({
      method: "POST",
      url: authApiPaths.register,
      data: request,
      worklog: { skipAuthRefresh: true },
    }),
  );
}

export function refreshSession() {
  return parseAuthResponse(
    apiRequest<unknown>({
      method: "POST",
      url: authApiPaths.refresh,
      worklog: { skipAuthRefresh: true },
    }),
  );
}

export function requestPasswordReset(request: ForgotPasswordRequest) {
  return apiRequest<unknown>({
    method: "POST",
    url: authApiPaths.forgotPassword,
    data: request,
    worklog: { skipAuthRefresh: true },
  });
}

export function resetPassword(request: ResetPasswordRequest) {
  return apiRequest<unknown>({
    method: "POST",
    url: authApiPaths.resetPassword,
    data: request,
    worklog: { skipAuthRefresh: true },
  });
}

export function getGoogleAuthenticationUrl() {
  return new URL(authApiPaths.google, `${env.VITE_API_BASE_URL}/`).toString();
}

export function logout() {
  return apiRequest<unknown>({
    method: "POST",
    url: authApiPaths.logout,
    worklog: { skipAuthRefresh: true },
  });
}
