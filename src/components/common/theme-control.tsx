import { Monitor, Moon, Sun } from "lucide-react";

import { type ThemePreference, useTheme } from "@/app/providers/theme-context";
import { Button } from "@/components/ui/button";

const THEME_OPTIONS = [
  { preference: "light", label: "Light", icon: Sun },
  { preference: "dark", label: "Dark", icon: Moon },
  { preference: "system", label: "System", icon: Monitor },
] satisfies ReadonlyArray<{
  preference: ThemePreference;
  label: string;
  icon: typeof Sun;
}>;

export function ThemeControl() {
  const { preference, setPreference } = useTheme();

  return (
    <div
      aria-label="Color theme"
      className="border-border/80 bg-card/75 inline-flex rounded-xl border p-1 shadow-sm"
      role="group"
    >
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isSelected = preference === option.preference;

        return (
          <Button
            aria-label={`Use ${option.label.toLowerCase()} theme`}
            aria-pressed={isSelected}
            className="size-8 rounded-lg p-0"
            key={option.preference}
            onClick={() => setPreference(option.preference)}
            title={`${option.label} theme`}
            type="button"
            variant={isSelected ? "outline" : "ghost"}
          >
            <Icon aria-hidden="true" />
          </Button>
        );
      })}
    </div>
  );
}
