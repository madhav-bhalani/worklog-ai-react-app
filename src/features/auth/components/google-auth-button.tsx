import { Button } from "@/components/ui/button";
import { getGoogleAuthenticationUrl } from "@/features/auth/api/auth.api";

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path
        d="M21.8 12.23c0-.71-.06-1.2-.2-1.7H12v3.46h5.64c-.11.86-.7 2.15-2.02 3.02l-.02.12 2.94 2.23.2.02c1.87-1.7 3.06-4.2 3.06-7.15Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.08-.9 6.78-2.45l-3.23-2.37c-.86.59-2.02 1-3.55 1a6.15 6.15 0 0 1-5.82-4.18l-.12.01-3.05 2.32-.04.11A10.18 10.18 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.18 14A6.06 6.06 0 0 1 5.84 12c0-.7.13-1.37.33-2l-.01-.14-3.1-2.36-.1.05A9.86 9.86 0 0 0 1.9 12c0 1.6.38 3.12 1.06 4.45L6.18 14Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.82c1.93 0 3.23.82 3.97 1.5l2.9-2.77C17.07 2.92 14.76 2 12 2a10.18 10.18 0 0 0-9.03 5.55l3.21 2.45A6.17 6.17 0 0 1 12 5.82Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function GoogleAuthButton() {
  function handleGoogleAuthentication() {
    window.location.assign(getGoogleAuthenticationUrl());
  }

  return (
    <Button
      className="w-full"
      onClick={handleGoogleAuthentication}
      type="button"
      variant="outline"
    >
      <GoogleMark />
      Continue with Google
    </Button>
  );
}
