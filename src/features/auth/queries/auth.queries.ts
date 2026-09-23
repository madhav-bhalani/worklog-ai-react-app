import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

import {
  login,
  logout,
  requestPasswordReset,
  refreshSession,
  register,
  resetPassword,
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

export function useRequestPasswordResetMutation() {
  return useMutation({ mutationFn: requestPasswordReset, retry: false });
}

export function useResetPasswordMutation() {
  return useMutation({ mutationFn: resetPassword, retry: false });
}

export function useLogoutMutation() {
  return useMutation({ mutationFn: logout });
}
