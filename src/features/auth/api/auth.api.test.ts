import { http, HttpResponse } from "msw";

import { login, logout, register } from "@/features/auth/api/auth.api";
import { env } from "@/lib/env/env";
import { mockServer } from "@/test/msw/server";

const USER = {
  id: 1,
  name: "Test User",
  email: "user@example.com",
  phone: null,
  avatarId: null,
  timezoneId: null,
  authProvider: "manual",
  isActive: 1,
  isMfaEnabled: 0,
  isEmailNotification: 1,
  isPushNotification: 1,
  createdAt: "2026-09-17T09:18:52.672Z",
  updatedAt: "2026-09-17T09:18:52.672Z",
  deletedAt: null,
} as const;

describe("auth API", () => {
  it("maps login email to identifier and relies on the shared client wrapper", async () => {
    expect.assertions(2);

    mockServer.use(
      http.post(
        `${env.VITE_API_BASE_URL}/api/v1/auth/login`,
        async ({ request }) => {
          expect(await request.json()).toEqual({
            data: {
              identifier: "user@example.com",
              password: "password123",
              devicePlatform: "web",
              browserName: "Chrome",
              browserVersion: "120.0",
            },
          });

          return HttpResponse.json({
            error: false,
            statusCode: 200,
            message: "User has been logged in successfully",
            data: { user: USER },
          });
        },
      ),
    );

    await expect(
      login({
        identifier: "user@example.com",
        password: "password123",
        devicePlatform: "web",
        browserName: "Chrome",
        browserVersion: "120.0",
      }),
    ).resolves.toEqual({ user: USER });
  });

  it("never sends the frontend-only confirmPassword field during registration", async () => {
    expect.assertions(2);

    mockServer.use(
      http.post(
        `${env.VITE_API_BASE_URL}/api/v1/auth/register`,
        async ({ request }) => {
          expect(await request.json()).toEqual({
            data: {
              name: "Test User",
              email: "user@example.com",
              password: "password123",
              devicePlatform: "web",
              browserName: "Chrome",
              browserVersion: "120.0",
            },
          });

          return HttpResponse.json({
            error: false,
            statusCode: 200,
            message: "User has been registered successfully",
            data: { user: USER },
          });
        },
      ),
    );

    await expect(
      register({
        name: "Test User",
        email: "user@example.com",
        password: "password123",
        devicePlatform: "web",
        browserName: "Chrome",
        browserVersion: "120.0",
      }),
    ).resolves.toEqual({ user: USER });
  });

  it("calls logout through the shared credentialed client", async () => {
    expect.assertions(2);

    mockServer.use(
      http.post(
        `${env.VITE_API_BASE_URL}/api/v1/auth/logout`,
        ({ request }) => {
          expect(request.headers.get("x-api-key")).toBe(env.SERVER_API_KEY);

          return HttpResponse.json({
            error: false,
            statusCode: 200,
            message: "User has been logged out successfully",
            data: null,
          });
        },
      ),
    );

    await expect(logout()).resolves.toBeNull();
  });
});
