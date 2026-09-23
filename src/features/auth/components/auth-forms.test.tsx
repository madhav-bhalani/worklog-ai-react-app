import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { vi } from "vitest";

import { LoginForm } from "@/features/auth/components/login-form";
import { RegisterForm } from "@/features/auth/components/register-form";
import { env } from "@/lib/env/env";
import { mockServer } from "@/test/msw/server";

const routerMock = vi.hoisted(() => ({ navigate: vi.fn() }));

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@tanstack/react-router")>();

  return {
    ...actual,
    Link: ({ children }: { children: ReactNode }) => <a href="#">{children}</a>,
    useNavigate: () => routerMock.navigate,
  };
});

function renderForm(children: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  );
}

describe("authentication forms", () => {
  it("shows inline login validation before submitting", async () => {
    const user = userEvent.setup();
    renderForm(<LoginForm />);

    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByText("Enter a valid email address.")).toBeVisible();
    expect(screen.getByText("Enter your password.")).toBeVisible();
  });

  it("shows a safe backend login failure next to the form", async () => {
    const user = userEvent.setup();
    mockServer.use(
      http.post(`${env.VITE_API_BASE_URL}/auth/login`, () =>
        HttpResponse.json(
          {
            error: true,
            statusCode: 401,
            errorType: "INVALID_CREDENTIALS",
            message: "Email or password is incorrect.",
            data: null,
          },
          { status: 401 },
        ),
      ),
    );
    renderForm(<LoginForm />);

    await user.type(screen.getByLabelText("Email address"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText("Email or password is incorrect."),
    ).toBeVisible();
  });

  it("blocks register submission when confirmation does not match", async () => {
    const user = userEvent.setup();
    renderForm(<RegisterForm />);

    await user.type(screen.getByLabelText("Name"), "Test User");
    await user.type(screen.getByLabelText("Email address"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(
      screen.getByLabelText("Confirm password"),
      "different-password",
    );
    const form = screen
      .getByRole("button", { name: "Create account" })
      .closest("form");

    if (!form) {
      throw new Error(
        "Expected the create-account button to be inside a form.",
      );
    }

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match.")).toBeVisible();
    });
  });
});
