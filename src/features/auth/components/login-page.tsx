import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";

interface LoginPageProps {
  registeredEmail?: string | undefined;
}

export function LoginPage({ registeredEmail }: LoginPageProps) {
  return (
    <AuthLayout
      description="Welcome back. Sign in to keep your worklog moving."
      title="Sign in"
    >
      <LoginForm registeredEmail={registeredEmail} />
    </AuthLayout>
  );
}
