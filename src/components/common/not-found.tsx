import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <section className="m-auto max-w-lg text-center">
      <p className="text-primary font-mono text-sm">404</p>
      <h1 className="mt-3 text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground mt-2">
        This route does not exist in Worklog AI.
      </p>
      <Button asChild className="mt-5">
        <Link to="/">Return home</Link>
      </Button>
    </section>
  );
}
