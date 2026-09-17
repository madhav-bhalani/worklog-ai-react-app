import { QueryClient } from "@tanstack/react-query";

import { ApiError } from "@/lib/api/api-error";

const MAX_TRANSIENT_RETRIES = 2;

function shouldRetryQuery(failureCount: number, error: Error) {
  if (failureCount >= MAX_TRANSIENT_RETRIES) return false;
  if (!(error instanceof ApiError)) return false;

  return error.category === "network" || error.category === "server";
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: shouldRetryQuery,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}
