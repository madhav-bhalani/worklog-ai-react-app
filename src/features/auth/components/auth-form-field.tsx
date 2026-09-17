import type { ReactNode } from "react";

interface AuthFormFieldProps {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  children: ReactNode;
}

export function AuthFormField({
  label,
  htmlFor,
  error,
  children,
}: AuthFormFieldProps) {
  const errorId = `${htmlFor}-error`;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-destructive text-sm" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
