import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

interface ResetPasswordPageProps {
  passwordResetToken: string;
}
export function ResetPasswordPage({
  passwordResetToken,
}: ResetPasswordPageProps) {
  return (
    <AuthLayout
      description="Choose a new password for your Worklog AI account."
      title="Create a new password"
    >
      <ResetPasswordForm passwordResetToken={passwordResetToken} />
    </AuthLayout>
  );
}
