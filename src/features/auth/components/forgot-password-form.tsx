import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api/api-error";
import { AuthFormField } from "@/features/auth/components/auth-form-field";
import { useRequestPasswordResetMutation } from "@/features/auth/queries/auth.queries";
import {
  forgotPasswordFormSchema,
  type ForgotPasswordFormValues,
} from "@/features/auth/schemas/auth-forms.schema";

export function ForgotPasswordForm() {
  const passwordResetMutation = useRequestPasswordResetMutation();
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  async function handleSubmit(values: ForgotPasswordFormValues) {
    try {
      await passwordResetMutation.mutateAsync(values);
    } catch {
      // The normalized API error is rendered next to this form.
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    void form.handleSubmit(handleSubmit)(event);
  }

  const error = passwordResetMutation.error;
  const formError =
    passwordResetMutation.isError && error instanceof ApiError
      ? error.message
      : passwordResetMutation.isError
        ? "We couldn't send the reset email. Please try again."
        : undefined;

  if (passwordResetMutation.isSuccess) {
    return (
      <div className="space-y-5">
        <p
          className="border-success/30 bg-success/10 rounded-md border px-3 py-2.5 text-sm"
          role="status"
        >
          We&apos;ve sent a password-reset link to your email address. Please
          check your inbox.
        </p>
        <Link
          className="text-primary text-sm font-medium hover:underline"
          to="/login"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleFormSubmit}>
      {formError ? (
        <p
          className="border-destructive/30 bg-destructive/10 rounded-md border px-3 py-2.5 text-sm"
          role="alert"
        >
          {formError}
        </p>
      ) : null}
      <AuthFormField
        error={form.formState.errors.email?.message}
        htmlFor="forgot-password-email"
        label="Email address"
      >
        <Input
          aria-describedby={
            form.formState.errors.email
              ? "forgot-password-email-error"
              : undefined
          }
          aria-invalid={Boolean(form.formState.errors.email)}
          autoComplete="email"
          id="forgot-password-email"
          inputMode="email"
          placeholder="you@example.com"
          type="email"
          {...form.register("email")}
        />
      </AuthFormField>
      <Button
        className="w-full"
        disabled={passwordResetMutation.isPending}
        type="submit"
      >
        {passwordResetMutation.isPending ? (
          <LoaderCircle aria-hidden="true" className="animate-spin" />
        ) : null}
        {passwordResetMutation.isPending
          ? "Sending link..."
          : "Send reset link"}
      </Button>
      <p className="text-muted-foreground text-center text-sm">
        Remembered your password?{" "}
        <Link className="text-primary font-medium hover:underline" to="/login">
          Sign in
        </Link>
      </p>
    </form>
  );
}
