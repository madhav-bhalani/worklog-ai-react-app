import { createFileRoute } from "@tanstack/react-router";

import { RegisterPage } from "@/features/auth/components/register-page";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});
