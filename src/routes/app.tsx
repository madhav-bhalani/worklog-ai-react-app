import { createFileRoute } from "@tanstack/react-router";

import { AuthenticatedHomePage } from "@/features/auth/components/authenticated-home-page";

export const Route = createFileRoute("/app")({
  component: AuthenticatedHomePage,
});
