import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { LoginRoutePage } from "@/features/auth/components/login-route-page";

const loginSearchSchema = z.object({
  email: z.email().optional(),
  registered: z.literal("1").optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  component: LoginRoutePage,
});
