import { z } from "zod";

const apiBaseUrlSchema = z
  .string()
  .trim()
  .min(1)
  .superRefine((value, context) => {
    try {
      const url = new URL(value);

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        context.addIssue({
          code: "custom",
          message: "must use http or https",
        });
      }

      if (url.pathname !== "/" || url.search || url.hash) {
        context.addIssue({
          code: "custom",
          message: "must be an origin without a path, query, or hash",
        });
      }

      if (value.endsWith("/")) {
        context.addIssue({
          code: "custom",
          message: "must not include a trailing slash",
        });
      }
    } catch {
      context.addIssue({
        code: "custom",
        message: "must be a valid URL",
      });
    }
  });

const publicEnvironmentSchema = z.object({
  VITE_API_BASE_URL: apiBaseUrlSchema,
  SERVER_API_KEY: z.string().trim().min(1),
});

const parsedEnvironment = publicEnvironmentSchema.safeParse(import.meta.env);

if (!parsedEnvironment.success) {
  const configurationIssues = parsedEnvironment.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  throw new Error(
    `Invalid public environment configuration: ${configurationIssues}`,
  );
}

export const env = Object.freeze(parsedEnvironment.data);
