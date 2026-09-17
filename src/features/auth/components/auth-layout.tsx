import type { ReactNode } from "react";

import { Braces, ShieldCheck } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <section
      className="my-auto grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-20"
      aria-labelledby="auth-heading"
    >
      <div className="max-w-xl lg:pb-6">
        <div className="bg-primary text-primary-foreground mb-6 grid size-11 place-items-center rounded-xl shadow-sm">
          <Braces aria-hidden="true" className="size-6" />
        </div>
        <p className="text-primary font-mono text-sm font-medium tracking-wide">
          WORKLOG AI
        </p>
        <h1
          className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          id="auth-heading"
        >
          Turn commits into a clear daily record.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-lg text-base leading-7 sm:text-lg">
          A focused workspace for developers to create worklogs grounded in the
          work they ship.
        </p>
        <div className="border-border bg-card text-card-foreground mt-8 hidden max-w-md items-start gap-3 rounded-xl border p-4 sm:flex">
          <ShieldCheck
            aria-hidden="true"
            className="text-success mt-0.5 size-5 shrink-0"
          />
          <p className="text-sm leading-6">
            Your session is protected with secure, HttpOnly cookies. We never
            store authentication tokens in the browser.
          </p>
        </div>
      </div>
      <div className="border-border bg-card text-card-foreground rounded-xl border p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-1.5 text-sm leading-6">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
