import { AuthLayout } from "@/features/auth/components/auth-layout";
import { RegisterForm } from "@/features/auth/components/register-form";

export function RegisterPage() {
  return (
    <AuthLayout
      description="Create an account to start turning your commits into a better daily worklog."
      title="Create your account"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
