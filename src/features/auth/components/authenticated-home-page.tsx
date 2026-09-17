import { Navigate } from "@tanstack/react-router";
import { GitBranch, Sparkles } from "lucide-react";

import { useSessionQuery } from "@/features/auth/queries/auth.queries";

export function AuthenticatedHomePage() {
  const sessionQuery = useSessionQuery();

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
      <div className="enter-rise">
        <div className="flex items-start justify-between gap-4">
          <p className="text-primary pt-2 text-xs font-semibold tracking-[0.16em]">
            TODAY’S WORKSPACE
          </p>
        </div>
        <h1
          className="mt-5 text-4xl leading-none sm:text-5xl"
          id="workspace-heading"
        >
          Welcome back, {user.name}.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-base leading-7 sm:text-lg">
          Your Worklog AI workspace is ready. Connect a repository to turn your
          commits into a useful daily record.
        </p>
        <div className="enter-rise-delayed mt-10 grid gap-4 sm:grid-cols-2">
          <article className="border-border/80 bg-card/75 group rounded-3xl border p-6 transition-transform duration-300 hover:-translate-y-1">
            <GitBranch
              aria-hidden="true"
              className="text-primary mb-8 size-5 transition-transform duration-300 group-hover:rotate-6"
            />
            <h2 className="text-2xl">Connect GitHub</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              Link the repositories that should inform your worklogs.
            </p>
          </article>
          <article className="border-border/80 bg-card/75 group rounded-3xl border p-6 transition-transform duration-300 hover:-translate-y-1">
            <Sparkles
              aria-hidden="true"
              className="text-primary mb-8 size-5 transition-transform duration-300 group-hover:rotate-6"
            />
            <h2 className="text-2xl">Generate a worklog</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              Create a concise update grounded in your repository activity.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
