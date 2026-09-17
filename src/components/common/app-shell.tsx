import type { ReactNode } from "react";

import { Link, useRouterState } from "@tanstack/react-router";
import { ThemeControl } from "@/components/common/theme-control";
import { Braces } from "lucide-react";
import { AccountMenu } from "@/features/auth/components/account-menu";
import { useSessionQuery } from "@/features/auth/queries/auth.queries";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isWorkspaceRoute = pathname === "/app";
  const sessionQuery = useSessionQuery(isWorkspaceRoute);

  return (
    <div className="page-glow bg-background text-foreground min-h-screen">
      <a
        className="bg-primary text-primary-foreground sr-only z-50 rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        href="#main-content"
      >
        Skip to content
      </a>
      <header className="border-border/80 bg-background/75 sticky top-0 z-20 border-b backdrop-blur-xl">
        <div className="mx-auto flex min-h-[4.5rem] max-w-6xl flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="bg-foreground text-background grid size-9 place-items-center rounded-xl shadow-sm"
            >
              <Braces className="size-4" />
            </div>
            <div>
              <p className="font-editorial text-lg leading-none">Worklog AI</p>
              <p className="text-muted-foreground mt-1 text-xs tracking-wide">
                Developer worklogs, grounded in commits
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ThemeControl />
            {isWorkspaceRoute && sessionQuery.data ? (
              <AccountMenu user={sessionQuery.data.user} />
            ) : pathname === "/" ? (
              <Link
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-lg px-2 py-1 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                to="/login"
              >
                Sign in
              </Link>
            ) : null}
          </div>
        </div>
      </header>
      <main
        className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        id="main-content"
      >
        {children}
      </main>
    </div>
  );
}
