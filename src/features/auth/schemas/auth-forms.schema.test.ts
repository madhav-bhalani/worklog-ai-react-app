import {
  registerFormSchema,
  resetPasswordFormSchema,
} from "@/features/auth/schemas/auth-forms.schema";

describe("registerFormSchema", () => {
  it("rejects mismatched passwords", () => {
    const result = registerFormSchema.safeParse({
      name: "Test User",
      email: "user@example.com",
      password: "password123",
      confirmPassword: "different-password",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["confirmPassword"]);
    }
  });

  it.each([
    "short1!A",
    "alllowercase1!",
    "ALLUPPERCASE1!",
    "NoNumber!",
    "NoSpecial1",
  ])("rejects a password that misses a required character type", (password) => {
    expect(
      registerFormSchema.safeParse({
        name: "Test User",
        email: "user@example.com",
        password,
        confirmPassword: password,
      }).success,
    ).toBe(false);
  });

  it("accepts a compliant reset password", () => {
    expect(
      resetPasswordFormSchema.safeParse({
        password: "GoodPass1!",
        confirmPassword: "GoodPass1!",
      }).success,
    ).toBe(true);
  });
});
