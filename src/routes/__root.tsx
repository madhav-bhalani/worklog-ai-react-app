import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import type { RouterContext } from "@/app/router/router-context";
import { AppShell } from "@/components/common/app-shell";
import { NotFound } from "@/components/common/not-found";
import { RootError } from "@/components/common/root-error";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  errorComponent: RootError,
  notFoundComponent: NotFound,
});

export function RootLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
