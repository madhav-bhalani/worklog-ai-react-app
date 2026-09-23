import { useSearch } from "@tanstack/react-router";

import { OAuthResultPage } from "@/features/auth/components/oauth-result-page";

export function OAuthResultRoutePage() {
  const { status } = useSearch({ from: "/oauth/result" });

  return <OAuthResultPage status={status} />;
}
