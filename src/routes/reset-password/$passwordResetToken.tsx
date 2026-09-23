import { createFileRoute } from "@tanstack/react-router";

import { ResetPasswordRoutePage } from "@/features/auth/components/reset-password-route-page";

export const Route = createFileRoute("/reset-password/$passwordResetToken")({
  component: ResetPasswordRoutePage,
});
