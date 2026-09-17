import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import { useTheme } from "@/app/providers/theme-context";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { createAppRouter } from "@/app/router/router";
import { setTerminalAuthFailureHandler } from "@/lib/api/auth-failure";
import { createQueryClient } from "@/lib/query/query-client";

function AppToaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      closeButton
      position="bottom-right"
      richColors
      theme={resolvedTheme}
    />
  );
}

export function AppProviders() {
  const [queryClient] = useState(createQueryClient);
  const [router] = useState(() => createAppRouter(queryClient));

  useEffect(
    () =>
      setTerminalAuthFailureHandler(() => {
        queryClient.clear();
      }),
    [queryClient],
  );

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <AppToaster />
        </QueryClientProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
