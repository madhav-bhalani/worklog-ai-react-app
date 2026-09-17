import { Braces, Check, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

const FOUNDATION_POINTS = [
  {
    icon: Braces,
    title: "Typed by default",
    description: "Strict TypeScript and validated public configuration.",
  },
  {
    icon: ShieldCheck,
    title: "Cookie-safe API layer",
    description: "Credentialed requests without browser-managed auth tokens.",
  },
  {
    icon: Check,
    title: "Ready for feature slices",
    description: "Routing, server state, themes, and testing are connected.",
  },
] as const;

export function FoundationPage() {
  return (
    <section className="my-auto w-full" aria-labelledby="foundation-heading">
      <div className="max-w-2xl">
        <p className="text-primary mb-3 font-mono text-sm font-medium">
          FOUNDATION / READY
        </p>
        <h1
          className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          id="foundation-heading"
        >
          A clean starting point for Worklog AI.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl text-base leading-7 sm:text-lg">
          Turn the work you ship into a clear daily record, grounded in your
          commits.
        </p>
        <Button asChild className="mt-6">
          <Link to="/register">Get started</Link>
        </Button>
      </div>

      <ul className="mt-8 grid gap-3 md:grid-cols-3" role="list">
        {FOUNDATION_POINTS.map((point) => {
          const Icon = point.icon;

          return (
            <li
              className="border-border bg-card text-card-foreground rounded-xl border p-5"
              key={point.title}
            >
              <Icon aria-hidden="true" className="text-primary mb-4 size-5" />
              <h2 className="font-medium">{point.title}</h2>
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                {point.description}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
