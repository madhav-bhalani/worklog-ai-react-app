import { useParams } from "@tanstack/react-router";

import { ResetPasswordPage } from "@/features/auth/components/reset-password-page";

export function ResetPasswordRoutePage() {
  const { passwordResetToken } = useParams({
    from: "/reset-password/$passwordResetToken",
  });

  return <ResetPasswordPage passwordResetToken={passwordResetToken} />;
}
