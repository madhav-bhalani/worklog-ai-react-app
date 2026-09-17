import { createFileRoute } from "@tanstack/react-router";

import { FoundationPage } from "@/components/common/foundation-page";

export const Route = createFileRoute("/")({
  component: FoundationPage,
});
