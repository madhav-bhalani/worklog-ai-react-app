import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import type { FormEvent } from "react";

import { ApiError } from "@/lib/api/api-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthFormField } from "@/features/auth/components/auth-form-field";
import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { PasswordInput } from "@/features/auth/components/password-input";
import {
  loginFormSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/auth-forms.schema";
import {
  sessionQueryOptions,
  useLoginMutation,
} from "@/features/auth/queries/auth.queries";
import { getBrowserDeviceInformation } from "@/features/auth/utils/browser-device-info";

interface LoginFormProps {
  registeredEmail?: string | undefined;
}

function getErrorMessage(error: unknown) {
  return error instanceof ApiError
    ? error.message
    : "We couldn't sign you in. Please try again.";
}

export function LoginForm({ registeredEmail }: LoginFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginMutation = useLoginMutation();
  const form = useForm<LoginFormValues>({
    defaultValues: { email: registeredEmail ?? "", password: "" },
    resolver: zodResolver(loginFormSchema),
  });

  async function handleSubmit(values: LoginFormValues) {
    try {
      await loginMutation.mutateAsync({
        ...getBrowserDeviceInformation(),
        identifier: values.email,
        password: values.password,
      });
      await queryClient.fetchQuery(sessionQueryOptions());
      await navigate({ to: "/app" });
    } catch {
      // The mutation error is intentionally rendered next to the form.
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    void form.handleSubmit(handleSubmit)(event);
  }

  const formError = loginMutation.isError
    ? getErrorMessage(loginMutation.error)
    : undefined;

  return (
    <form className="space-y-5" noValidate onSubmit={handleFormSubmit}>
      {registeredEmail ? (
        <p
          className="border-success/30 bg-success/10 text-foreground rounded-md border px-3 py-2.5 text-sm"
          role="status"
        >
          Your account is ready. Sign in to continue.
        </p>
      ) : null}
      {formError ? (
        <p
          className="border-destructive/30 bg-destructive/10 text-foreground rounded-md border px-3 py-2.5 text-sm"
          role="alert"
        >
          {formError}
        </p>
      ) : null}
      <AuthFormField
        error={form.formState.errors.email?.message}
        htmlFor="login-email"
        label="Email address"
      >
        <Input
          aria-describedby={
            form.formState.errors.email ? "login-email-error" : undefined
          }
          aria-invalid={Boolean(form.formState.errors.email)}
          autoComplete="email"
          id="login-email"
          inputMode="email"
          placeholder="you@example.com"
          type="email"
          {...form.register("email")}
        />
      </AuthFormField>
      <AuthFormField
        error={form.formState.errors.password?.message}
        htmlFor="login-password"
        label="Password"
      >
        <PasswordInput
          aria-describedby={
            form.formState.errors.password ? "login-password-error" : undefined
          }
          aria-invalid={Boolean(form.formState.errors.password)}
          autoComplete="current-password"
          id="login-password"
          placeholder="Enter your password"
          {...form.register("password")}
        />
      </AuthFormField>
      <Button
        className="w-full"
        disabled={loginMutation.isPending}
        type="submit"
      >
        {loginMutation.isPending ? (
          <LoaderCircle aria-hidden="true" className="animate-spin" />
        ) : null}
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </Button>
      <div className="flex items-center gap-3" aria-hidden="true">
        <div className="bg-border h-px flex-1" />
        <span className="text-muted-foreground text-xs">OR</span>
        <div className="bg-border h-px flex-1" />
      </div>
      <GoogleAuthButton />
      <p className="text-muted-foreground pt-1 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          className="text-primary focus-visible:ring-ring font-medium hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
          to="/register"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}
