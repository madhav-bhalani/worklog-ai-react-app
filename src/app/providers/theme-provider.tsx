import {
  type ReactNode,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from "react";

import {
  type ResolvedTheme,
  ThemeContext,
  type ThemePreference,
} from "@/app/providers/theme-context";

const THEME_STORAGE_KEY = "worklog-ai-theme";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

interface ThemeProviderProps {
  children: ReactNode;
}

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

function getInitialPreference(): ThemePreference {
  const storedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemePreference(storedPreference) ? storedPreference : "system";
}

function subscribeToSystemTheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DARK_MODE_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getSystemThemeSnapshot() {
  return window.matchMedia(DARK_MODE_QUERY).matches;
}

function getServerThemeSnapshot() {
  return false;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, setPreference] =
    useState<ThemePreference>(getInitialPreference);
  const isSystemDark = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    getServerThemeSnapshot,
  );
  const resolvedTheme: ResolvedTheme =
    preference === "system" ? (isSystemDark ? "dark" : "light") : preference;

  useLayoutEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", resolvedTheme === "dark");
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  }, [preference, resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ preference, resolvedTheme, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}
