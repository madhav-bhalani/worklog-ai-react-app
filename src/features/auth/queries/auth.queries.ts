import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

import {
  login,
  logout,
  refreshSession,
  register,
} from "@/features/auth/api/auth.api";

export const authKeys = {
  session: () => ["session"] as const,
};

export function sessionQueryOptions() {
  return queryOptions({
    queryKey: authKeys.session(),
    queryFn: refreshSession,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSessionQuery(isEnabled = true) {
  return useQuery({ ...sessionQueryOptions(), enabled: isEnabled });
}

export function useLoginMutation() {
  return useMutation({ mutationFn: login });
}

export function useRegisterMutation() {
  return useMutation({ mutationFn: register });
}

export function useLogoutMutation() {
  return useMutation({ mutationFn: logout });
}
