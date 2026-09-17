import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { LoaderCircle, LogOut, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  authKeys,
  useLogoutMutation,
} from "@/features/auth/queries/auth.queries";
import type { User } from "@/features/auth/types/auth.types";

interface AccountMenuProps {
  user: User;
}

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "U";
}

export function AccountMenu({ user }: AccountMenuProps) {
  const logoutMutation = useLogoutMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Clear local state even when the server has already ended the session.
    } finally {
      queryClient.removeQueries({ queryKey: authKeys.session() });
      await navigate({ to: "/login" });
    }
  }

  return (
    <details className="group relative shrink-0">
      <summary
        aria-label="Open account menu"
        className="border-border bg-card text-card-foreground hover:bg-muted focus-visible:ring-ring focus-visible:ring-offset-background flex h-10 cursor-pointer list-none items-center gap-2 rounded-xl border py-1 pr-2 pl-1 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"
      >
        <span className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-lg text-xs font-semibold">
          {getInitials(user.name)}
        </span>
        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
          {user.name}
        </span>
      </summary>
      <div className="border-border bg-card absolute top-12 right-0 z-30 w-60 rounded-2xl border p-2 shadow-xl">
        <div className="border-border border-b px-2 py-2.5">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="text-muted-foreground truncate text-xs">{user.email}</p>
        </div>
        <div className="pt-2">
          <Button
            className="w-full justify-start"
            disabled
            size="sm"
            title="Profile settings are not available yet."
            type="button"
            variant="ghost"
          >
            <UserRound aria-hidden="true" />
            Profile
          </Button>
          <Button
            className="w-full justify-start"
            disabled={logoutMutation.isPending}
            onClick={() => void handleLogout()}
            size="sm"
            type="button"
            variant="ghost"
          >
            {logoutMutation.isPending ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" />
            ) : (
              <LogOut aria-hidden="true" />
            )}
            {logoutMutation.isPending ? "Signing out..." : "Log out"}
          </Button>
        </div>
      </div>
    </details>
  );
}
