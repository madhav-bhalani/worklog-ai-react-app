import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemeProvider } from "@/app/providers/theme-provider";
import { ThemeControl } from "@/components/common/theme-control";

describe("ThemeControl", () => {
  it("applies and persists an explicit theme preference", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeControl />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Dark" }));

    expect(document.documentElement).toHaveClass("dark");
    expect(window.localStorage.getItem("worklog-ai-theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Dark" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
