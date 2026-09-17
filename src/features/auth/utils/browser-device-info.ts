import type { DeviceInformation } from "@/features/auth/types/auth.types";

interface BrowserDetails {
  browserName: string;
  browserVersion: string;
}

function getBrowserDetails(userAgent: string): BrowserDetails {
  const browserMatchers = [
    [/(?:Edg|EdgA|EdgiOS)\/([\d.]+)/, "Microsoft Edge"],
    [/Firefox\/([\d.]+)/, "Firefox"],
    [/CriOS\/([\d.]+)/, "Chrome"],
    [/Chrome\/([\d.]+)/, "Chrome"],
    [/Version\/([\d.]+).*Safari\//, "Safari"],
  ] as const;

  for (const [pattern, browserName] of browserMatchers) {
    const match = userAgent.match(pattern);
    const browserVersion = match?.[1];

    if (browserVersion) {
      return { browserName, browserVersion };
    }
  }

  return { browserName: "Unknown", browserVersion: "Unknown" };
}

export function getBrowserDeviceInformation(): Omit<
  DeviceInformation,
  "ipAddress"
> {
  const { browserName, browserVersion } = getBrowserDetails(
    window.navigator.userAgent,
  );

  return { devicePlatform: "web", browserName, browserVersion };
}
