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
  registerFormSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/auth-forms.schema";
import {
  sessionQueryOptions,
  useRegisterMutation,
} from "@/features/auth/queries/auth.queries";
import { getBrowserDeviceInformation } from "@/features/auth/utils/browser-device-info";

function getErrorMessage(error: unknown) {
  return error instanceof ApiError
    ? error.message
    : "We couldn't create your account. Please try again.";
}

export function RegisterForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const registerMutation = useRegisterMutation();
  const form = useForm<RegisterFormValues>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    resolver: zodResolver(registerFormSchema),
  });

  async function handleSubmit(values: RegisterFormValues) {
    try {
      await registerMutation.mutateAsync({
        ...getBrowserDeviceInformation(),
        name: values.name,
        email: values.email,
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

  const formError = registerMutation.isError
    ? getErrorMessage(registerMutation.error)
    : undefined;

  return (
    <form className="space-y-5" noValidate onSubmit={handleFormSubmit}>
      {formError ? (
        <p
          className="border-destructive/30 bg-destructive/10 text-foreground rounded-md border px-3 py-2.5 text-sm"
          role="alert"
        >
          {formError}
        </p>
      ) : null}
      <AuthFormField
        error={form.formState.errors.name?.message}
        htmlFor="register-name"
        label="Name"
      >
        <Input
          aria-describedby={
            form.formState.errors.name ? "register-name-error" : undefined
          }
          aria-invalid={Boolean(form.formState.errors.name)}
          autoComplete="name"
          id="register-name"
          placeholder="Your name"
          type="text"
          {...form.register("name")}
        />
      </AuthFormField>
      <AuthFormField
        error={form.formState.errors.email?.message}
        htmlFor="register-email"
        label="Email address"
      >
        <Input
          aria-describedby={
            form.formState.errors.email ? "register-email-error" : undefined
          }
          aria-invalid={Boolean(form.formState.errors.email)}
          autoComplete="email"
          id="register-email"
          inputMode="email"
          placeholder="you@example.com"
          type="email"
          {...form.register("email")}
        />
      </AuthFormField>
      <AuthFormField
        error={form.formState.errors.password?.message}
        htmlFor="register-password"
        label="Password"
      >
        <PasswordInput
          aria-describedby={
            form.formState.errors.password
              ? "register-password-error"
              : undefined
          }
          aria-invalid={Boolean(form.formState.errors.password)}
          autoComplete="new-password"
          id="register-password"
          placeholder="At least 8 characters"
          {...form.register("password")}
        />
      </AuthFormField>
      <AuthFormField
        error={form.formState.errors.confirmPassword?.message}
        htmlFor="register-confirm-password"
        label="Confirm password"
      >
        <PasswordInput
          aria-describedby={
            form.formState.errors.confirmPassword
              ? "register-confirm-password-error"
              : undefined
          }
          aria-invalid={Boolean(form.formState.errors.confirmPassword)}
          autoComplete="new-password"
          id="register-confirm-password"
          placeholder="Re-enter your password"
          {...form.register("confirmPassword")}
        />
      </AuthFormField>
      <Button
        className="w-full"
        disabled={registerMutation.isPending}
        type="submit"
      >
        {registerMutation.isPending ? (
          <LoaderCircle aria-hidden="true" className="animate-spin" />
        ) : null}
        {registerMutation.isPending ? "Creating account..." : "Create account"}
      </Button>
      <div className="flex items-center gap-3" aria-hidden="true">
        <div className="bg-border h-px flex-1" />
        <span className="text-muted-foreground text-xs">OR</span>
        <div className="bg-border h-px flex-1" />
      </div>
      <GoogleAuthButton />
      <p className="text-muted-foreground pt-1 text-center text-sm">
        Already have an account?{" "}
        <Link
          className="text-primary focus-visible:ring-ring font-medium hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
          to="/login"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
