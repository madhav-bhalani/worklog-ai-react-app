import { useEffect } from "react";

import { useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { useSessionQuery } from "@/features/auth/queries/auth.queries";

type GoogleOAuthStatus = "success" | "error" | "cancelled";

interface OAuthResultPageProps {
  status: GoogleOAuthStatus;
}

export function OAuthResultPage({ status }: OAuthResultPageProps) {
  const navigate = useNavigate();
  const sessionQuery = useSessionQuery(status === "success");

  useEffect(() => {
    if (status === "cancelled") {
      toast.message("Google sign-in was cancelled.");
      void navigate({ replace: true, to: "/login" });
      return;
    }

    if (status === "error") {
      toast.error("We couldn't complete Google sign-in. Please try again.");
      void navigate({ replace: true, to: "/login" });
      return;
    }

    if (sessionQuery.isSuccess) {
      toast.success("Signed in with Google.");
      void navigate({ replace: true, to: "/app" });
      return;
    }

    if (sessionQuery.isError) {
      toast.error("We couldn't verify your Google sign-in. Please try again.");
      void navigate({ replace: true, to: "/login" });
    }
  }, [navigate, sessionQuery.isError, sessionQuery.isSuccess, status]);

  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="my-auto w-full max-w-2xl"
    >
      <div className="flex items-center gap-3">
        <LoaderCircle
          aria-hidden="true"
          className="text-primary animate-spin"
        />
        <div>
          <h1 className="text-2xl">Finishing sign-in</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Confirming your session securely…
          </p>
        </div>
      </div>
    </section>
  );
}
