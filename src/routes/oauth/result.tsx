import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { OAuthResultRoutePage } from "@/features/auth/components/oauth-result-route-page";

const oauthResultSearchSchema = z.object({
  provider: z.literal("google"),
  status: z.enum(["success", "error", "cancelled"]),
});

export const Route = createFileRoute("/oauth/result")({
  validateSearch: oauthResultSearchSchema,
  component: OAuthResultRoutePage,
});
