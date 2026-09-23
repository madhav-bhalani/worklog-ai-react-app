import { Check, X } from "lucide-react";

import { cn } from "@/lib/cn";

interface PasswordRequirement {
  label: string;
  isMet: boolean;
}

interface PasswordRequirementsProps {
  password: string;
}

type PasswordStrengthLabel = "Weak" | "Fair" | "Good" | "Strong";

function getPasswordRequirements(password: string): PasswordRequirement[] {
  return [
    { label: "At least 8 characters", isMet: password.length >= 8 },
    { label: "One lowercase letter", isMet: /[a-z]/.test(password) },
    { label: "One uppercase letter", isMet: /[A-Z]/.test(password) },
    { label: "One number", isMet: /\d/.test(password) },
    { label: "One special character", isMet: /[^A-Za-z0-9]/.test(password) },
  ];
}

function getPasswordStrengthLabel(
  metRequirements: number,
): PasswordStrengthLabel {
  if (metRequirements <= 1) return "Weak";
  if (metRequirements <= 3) return "Fair";
  if (metRequirements === 4) return "Good";
  return "Strong";
}

function getPasswordStrengthClasses(strengthLabel: PasswordStrengthLabel) {
  switch (strengthLabel) {
    case "Weak":
      return { bar: "bg-destructive", label: "text-destructive" };
    case "Fair":
      return { bar: "bg-warning", label: "text-warning" };
    case "Good":
      return { bar: "bg-primary", label: "text-primary" };
    case "Strong":
      return { bar: "bg-success", label: "text-success" };
  }
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = getPasswordRequirements(password);
  const metRequirements = requirements.filter(({ isMet }) => isMet).length;
  const strengthLabel = getPasswordStrengthLabel(metRequirements);
  const strengthClasses = getPasswordStrengthClasses(strengthLabel);

  return (
    <section
      aria-label="Password requirements and strength"
      className="border-border bg-secondary/45 space-y-3 rounded-lg border p-3"
      id="password-requirements"
    >
      <div>
        <p className="text-foreground text-xs font-semibold">
          Your password must include
        </p>
        <ul aria-label="Password requirements" className="mt-2 space-y-1.5">
          {requirements.map(({ isMet, label }) => (
            <li
              className={cn(
                "flex items-center gap-1.5 text-xs",
                isMet ? "text-success" : "text-muted-foreground",
              )}
              key={label}
            >
              {isMet ? (
                <Check aria-hidden="true" className="size-3.5 shrink-0" />
              ) : (
                <X aria-hidden="true" className="size-3.5 shrink-0" />
              )}
              <span className="text-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-foreground text-xs font-semibold">
            Password strength
          </p>
          <span className={cn("text-xs font-medium", strengthClasses.label)}>
            {strengthLabel}
          </span>
        </div>
        <div
          aria-label={`${strengthLabel} password strength: ${metRequirements} of ${requirements.length} requirements met`}
          className="mt-2 flex gap-1"
          role="progressbar"
          aria-valuemax={requirements.length}
          aria-valuemin={0}
          aria-valuenow={metRequirements}
        >
          {requirements.map((requirement, index) => (
            <span
              className={cn(
                "h-1 flex-1 rounded-full",
                index < metRequirements ? strengthClasses.bar : "bg-border",
              )}
              key={requirement.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
