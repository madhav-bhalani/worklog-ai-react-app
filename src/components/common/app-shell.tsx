import type { ReactNode } from "react";

import { ThemeControl } from "@/components/common/theme-control";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <a
        className="bg-primary text-primary-foreground sr-only z-50 rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        href="#main-content"
      >
        Skip to content
      </a>
      <header className="border-border bg-background/95 border-b">
        <div className="mx-auto flex min-h-16 max-w-6xl flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="bg-primary text-primary-foreground grid size-9 place-items-center rounded-lg font-mono text-sm font-semibold"
            >
              W
            </div>
            <div>
              <p className="font-semibold tracking-tight">Worklog AI</p>
              <p className="text-muted-foreground text-xs">
                Developer worklogs, grounded in commits
              </p>
            </div>
          </div>
          <ThemeControl />
        </div>
      </header>
      <main
        className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
        id="main-content"
      >
        {children}
      </main>
    </div>
  );
}
