import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      description="Enter your email and we’ll send a link to reset your password."
      title="Reset your password"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
