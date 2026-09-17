import { useSearch } from "@tanstack/react-router";

import { LoginPage } from "@/features/auth/components/login-page";

export function LoginRoutePage() {
  const { email, registered } = useSearch({ from: "/login" });

  return <LoginPage registeredEmail={registered ? email : undefined} />;
}
