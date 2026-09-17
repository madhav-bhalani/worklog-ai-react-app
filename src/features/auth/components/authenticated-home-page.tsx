import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "@tanstack/react-router";
import {
  GitBranch,
  LoaderCircle,
  LogOut,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  authKeys,
  useLogoutMutation,
  useSessionQuery,
} from "@/features/auth/queries/auth.queries";

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "U";
}

export function AuthenticatedHomePage() {
  const sessionQuery = useSessionQuery();
  const logoutMutation = useLogoutMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Clear local session state even when the server no longer recognizes it.
    } finally {
      queryClient.removeQueries({ queryKey: authKeys.session() });
      await navigate({ to: "/login" });
    }
  }

  if (sessionQuery.isPending) {
    return (
      <section
        className="my-auto w-full max-w-2xl"
        aria-busy="true"
        aria-live="polite"
      >
        <p className="text-muted-foreground text-sm">Restoring your session…</p>
      </section>
    );
  }

  if (sessionQuery.isError) {
    return <Navigate replace to="/login" />;
  }

  const { user } = sessionQuery.data;

  return (
    <section
      className="my-auto w-full max-w-3xl"
      aria-labelledby="workspace-heading"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-primary pt-2 font-mono text-sm font-medium">
          WORKSPACE
        </p>
        <details className="group relative shrink-0">
          <summary
            className="border-border bg-card text-card-foreground hover:bg-muted focus-visible:ring-ring focus-visible:ring-offset-background flex size-10 cursor-pointer list-none items-center justify-center rounded-full border text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"
            aria-label="Open account menu"
          >
            {getInitials(user.name)}
          </summary>
          <div className="border-border bg-card absolute top-12 right-0 z-10 w-56 rounded-lg border p-2 shadow-lg">
            <div className="border-border border-b px-2 py-2.5">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="text-muted-foreground truncate text-xs">
                {user.email}
              </p>
            </div>
            <div className="pt-2">
              <Button
                className="w-full justify-start"
                disabled
                size="sm"
                title="Profile settings are not available yet."
                type="button"
                variant="ghost"
              >
                <UserRound aria-hidden="true" />
                Profile
              </Button>
              <Button
                className="w-full justify-start"
                disabled={logoutMutation.isPending}
                onClick={() => void handleLogout()}
                size="sm"
                type="button"
                variant="ghost"
              >
                {logoutMutation.isPending ? (
                  <LoaderCircle aria-hidden="true" className="animate-spin" />
                ) : (
                  <LogOut aria-hidden="true" />
                )}
                {logoutMutation.isPending ? "Signing out..." : "Log out"}
              </Button>
            </div>
          </div>
        </details>
      </div>
      <h1
        className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        id="workspace-heading"
      >
        Welcome back, {user.name}.
      </h1>
      <p className="text-muted-foreground mt-4 max-w-xl text-base leading-7 sm:text-lg">
        Your Worklog AI workspace is ready. Connect a repository to turn your
        commits into a useful daily record.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <article className="border-border bg-card rounded-xl border p-5">
          <GitBranch aria-hidden="true" className="text-primary mb-4 size-5" />
          <h2 className="font-medium">Connect GitHub</h2>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Link the repositories that should inform your worklogs.
          </p>
        </article>
        <article className="border-border bg-card rounded-xl border p-5">
          <Sparkles aria-hidden="true" className="text-primary mb-4 size-5" />
          <h2 className="font-medium">Generate a worklog</h2>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Create a concise update grounded in your repository activity.
          </p>
        </article>
      </div>
    </section>
  );
}
