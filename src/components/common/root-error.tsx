import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function RootError({ reset }: ErrorComponentProps) {
  return (
    <section
      aria-labelledby="application-error-heading"
      className="enter-rise border-border/80 bg-card/85 m-auto max-w-lg rounded-3xl border p-7 shadow-[0_20px_60px_rgb(75_45_25/0.09)]"
      role="alert"
    >
      <AlertTriangle aria-hidden="true" className="text-destructive size-5" />
      <h1 className="mt-5 text-3xl leading-none" id="application-error-heading">
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
