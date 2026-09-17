import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function RootError({ reset }: ErrorComponentProps) {
  return (
    <section
      aria-labelledby="application-error-heading"
      className="border-border bg-card m-auto max-w-lg rounded-xl border p-6"
      role="alert"
    >
      <AlertTriangle aria-hidden="true" className="text-destructive size-6" />
      <h1 className="mt-4 text-xl font-semibold" id="application-error-heading">
        Something went wrong
      </h1>
      <p className="text-muted-foreground mt-2">
        The application could not render this view. Try loading it again.
      </p>
      <Button className="mt-5" onClick={reset} type="button">
        Try again
      </Button>
    </section>
  );
}
