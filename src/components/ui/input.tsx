import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "border-input bg-background/75 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/25 focus-visible:bg-background flex h-11 w-full rounded-xl border px-3.5 py-2 text-sm shadow-xs transition-[border-color,box-shadow,background-color] outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
