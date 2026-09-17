import {
  ArrowUpRight,
  Braces,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
      <div className="enter-rise max-w-3xl">
        <div className="mb-7 flex items-center gap-3">
          <span className="bg-primary size-2 rounded-full" />
          <p className="text-primary text-xs font-semibold tracking-[0.16em]">
            YOUR DAILY DEVELOPMENT RECORD
          </p>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          Make the important work visible.
        </p>
        <h1
          className="max-w-3xl text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl"
          id="foundation-heading"
        >
          Work that reads like it mattered.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-base leading-7 sm:text-lg">
          Worklog AI turns repository activity into a thoughtful daily update—
          grounded in the work you actually shipped.
        </p>
        <Button asChild className="mt-8">
          <Link to="/register">
            Start your worklog <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <ul
        className="enter-rise-delayed mt-14 grid gap-3 md:grid-cols-3"
        role="list"
      >
        {FOUNDATION_POINTS.map((point) => {
          const Icon = point.icon;

          return (
            <li
              className="border-border/80 bg-card/75 text-card-foreground group rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1"
              key={point.title}
            >
              <Icon
                aria-hidden="true"
                className="text-primary mb-7 size-5 transition-transform duration-300 group-hover:rotate-6"
              />
              <h2 className="text-xl">{point.title}</h2>
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                {point.description}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="border-border/70 bg-card/60 mt-4 flex items-center gap-3 rounded-2xl border px-5 py-4 text-sm sm:max-w-md">
        <Sparkles aria-hidden="true" className="text-primary size-4 shrink-0" />
        <p className="text-muted-foreground">
          Built for the rhythm of real development.
        </p>
      </div>
    </section>
  );
}
