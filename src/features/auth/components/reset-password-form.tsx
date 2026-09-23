import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/api-error";
import { AuthFormField } from "@/features/auth/components/auth-form-field";
import { PasswordInput } from "@/features/auth/components/password-input";
import { PasswordRequirements } from "@/features/auth/components/password-requirements";
import { useResetPasswordMutation } from "@/features/auth/queries/auth.queries";
import {
  resetPasswordFormSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas/auth-forms.schema";

interface ResetPasswordFormProps {
  passwordResetToken: string;
}

export function ResetPasswordForm({
  passwordResetToken,
}: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const passwordResetMutation = useResetPasswordMutation();
  const form = useForm<ResetPasswordFormValues>({
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onChange",
    resolver: zodResolver(resetPasswordFormSchema),
  });
  const password = useWatch({ control: form.control, name: "password" });
  async function handleSubmit(values: ResetPasswordFormValues) {
    try {
      await passwordResetMutation.mutateAsync({
        passwordResetToken,
        password: values.password,
      });
      await navigate({ to: "/login", search: { passwordReset: "1" } });
    } catch {
      /* Rendered below. */
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
        ? "We couldn't reset your password. Please try again."
        : undefined;
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
      <AuthFormField htmlFor="reset-password" label="New password">
        <PasswordInput
          aria-describedby="password-requirements"
          aria-invalid={Boolean(form.formState.errors.password)}
          autoComplete="new-password"
          id="reset-password"
          placeholder="Create a new password"
          {...form.register("password")}
        />
        <PasswordRequirements password={password} />
      </AuthFormField>
      <AuthFormField
        error={form.formState.errors.confirmPassword?.message}
        htmlFor="reset-confirm-password"
        label="Confirm new password"
      >
        <PasswordInput
          aria-describedby={
            form.formState.errors.confirmPassword
              ? "reset-confirm-password-error"
              : undefined
          }
          aria-invalid={Boolean(form.formState.errors.confirmPassword)}
          autoComplete="new-password"
          id="reset-confirm-password"
          placeholder="Confirm your new password"
          {...form.register("confirmPassword")}
        />
      </AuthFormField>
      <Button
        className="w-full"
        disabled={passwordResetMutation.isPending || !form.formState.isValid}
        type="submit"
      >
        {passwordResetMutation.isPending ? (
          <LoaderCircle aria-hidden="true" className="animate-spin" />
        ) : null}
        {passwordResetMutation.isPending
          ? "Resetting password..."
          : "Reset password"}
      </Button>
    </form>
  );
}
