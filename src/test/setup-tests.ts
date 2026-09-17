import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";

import { mockServer } from "@/test/msw/server";

const matchMedia = (query: string): MediaQueryList => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
  addListener: () => undefined,
  removeListener: () => undefined,
  dispatchEvent: () => true,
});

Object.defineProperty(window, "matchMedia", {
  configurable: true,
  value: matchMedia,
  writable: true,
});

beforeAll(() => mockServer.listen({ onUnhandledRequest: "error" }));

afterEach(() => {
  cleanup();
  mockServer.resetHandlers();
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
  delete document.documentElement.dataset.theme;
});

afterAll(() => mockServer.close());
