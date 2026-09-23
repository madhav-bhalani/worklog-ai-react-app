import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";

interface LoginPageProps {
  hasPasswordBeenReset?: boolean | undefined;
  registeredEmail?: string | undefined;
}

export function LoginPage({
  hasPasswordBeenReset,
  registeredEmail,
}: LoginPageProps) {
  return (
    <AuthLayout
      description="Welcome back. Sign in to keep your worklog moving."
      title="Sign in"
    >
      <LoginForm
        hasPasswordBeenReset={hasPasswordBeenReset}
        registeredEmail={registeredEmail}
      />
    </AuthLayout>
  );
}
