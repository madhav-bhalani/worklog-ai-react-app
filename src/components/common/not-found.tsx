import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <section className="enter-rise m-auto max-w-lg text-center">
      <p className="text-primary text-xs font-semibold tracking-[0.18em]">
        404
      </p>
      <h1 className="mt-4 text-4xl leading-none">This page took a detour.</h1>
      <p className="text-muted-foreground mt-4 text-base leading-7">
        This route does not exist in Worklog AI.
      </p>
      <Button asChild className="mt-7">
        <Link to="/">Return home</Link>
      </Button>
    </section>
  );
}
