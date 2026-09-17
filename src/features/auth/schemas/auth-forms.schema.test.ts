import { registerFormSchema } from "@/features/auth/schemas/auth-forms.schema";

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
});
