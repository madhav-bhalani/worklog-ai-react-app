import { useSearch } from "@tanstack/react-router";

import { LoginPage } from "@/features/auth/components/login-page";

export function LoginRoutePage() {
  const { email, passwordReset, registered } = useSearch({ from: "/login" });

  return (
    <LoginPage
      hasPasswordBeenReset={passwordReset === "1"}
      registeredEmail={registered ? email : undefined}
    />
  );
}
