import type { ReactNode } from "react";

import { ArrowUpRight, Braces, Check, ShieldCheck } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <section
      className="my-auto grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-24"
      aria-labelledby="auth-heading"
    >
      <div className="enter-rise max-w-xl lg:pb-6">
        <div className="bg-foreground text-background mb-7 grid size-11 place-items-center rounded-2xl shadow-lg">
          <Braces aria-hidden="true" className="size-5" />
        </div>
        <p className="text-primary text-xs font-semibold tracking-[0.16em]">
          THE CALM WAY TO SHIP
        </p>
        <h1
          className="mt-4 max-w-lg text-4xl leading-[1.04] text-balance sm:text-5xl"
          id="auth-heading"
        >
          Turn commits into a clear daily record.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-lg text-base leading-7 sm:text-lg">
          A considered workspace for turning the work you ship into a daily
          record you’ll actually want to share.
        </p>
        <div className="mt-9 hidden max-w-md gap-5 sm:flex">
          <div className="bg-secondary text-secondary-foreground grid size-10 shrink-0 place-items-center rounded-full">
            <Check aria-hidden="true" className="size-4" />
          </div>
          <p className="text-muted-foreground pt-1 text-sm leading-6">
            Follow your actual commit history. Keep the useful bits. Leave the
            blank-page ritual behind.
          </p>
        </div>
        <div className="border-border/80 bg-card/65 text-card-foreground mt-7 hidden max-w-md items-start gap-3 rounded-2xl border p-4 sm:flex">
          <ShieldCheck
            aria-hidden="true"
            className="text-success mt-0.5 size-4 shrink-0"
          />
          <p className="text-muted-foreground text-sm leading-6">
            Your session is protected with secure, HttpOnly cookies. We never
            store authentication tokens in the browser.
          </p>
        </div>
      </div>
      <div className="enter-rise-delayed border-border/80 bg-card/90 text-card-foreground rounded-3xl border p-6 shadow-[0_20px_60px_rgb(75_45_25/0.09)] backdrop-blur-sm sm:p-8">
        <div className="mb-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.14em]">
              WORKLOG AI
            </p>
            <ArrowUpRight aria-hidden="true" className="text-primary size-4" />
          </div>
          <h2 className="text-3xl leading-none">{title}</h2>
          <p className="text-muted-foreground mt-1.5 text-sm leading-6">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
