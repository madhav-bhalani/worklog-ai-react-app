import { http, HttpResponse } from "msw";

import { apiRequest } from "@/lib/api/api-client";
import { env } from "@/lib/env/env";
import { mockServer } from "@/test/msw/server";

describe("apiRequest", () => {
  it("sends the configured public API key through the shared client", async () => {
    expect.assertions(2);

    mockServer.use(
      http.get(`${env.VITE_API_BASE_URL}/api/v1/test`, ({ request }) => {
        expect(request.headers.get("x-api-key")).toBe(env.SERVER_API_KEY);

        return HttpResponse.json({
          error: false,
          statusCode: 200,
          message: "OK",
          data: { isReady: true },
        });
      }),
    );

    await expect(
      apiRequest<{ isReady: boolean }>({
        method: "GET",
        url: "/api/v1/test",
      }),
    ).resolves.toEqual({ isReady: true });
  });
});
