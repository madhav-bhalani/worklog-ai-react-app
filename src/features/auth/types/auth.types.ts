import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.email(),
  phone: z.string().nullable(),
  avatarId: z.number().int().nullable(),
  timezoneId: z.number().int().nullable(),
  authProvider: z.string(),
  isActive: z.union([z.literal(0), z.literal(1)]),
  isMfaEnabled: z.union([z.literal(0), z.literal(1)]),
  isEmailNotification: z.union([z.literal(0), z.literal(1)]),
  isPushNotification: z.union([z.literal(0), z.literal(1)]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export const authResponseSchema = z.object({ user: userSchema });

export const deviceInformationSchema = z.object({
  devicePlatform: z.literal("web"),
  browserName: z.string().min(1),
  browserVersion: z.string().min(1),
  // The backend currently asks for this, but a browser cannot safely determine it.
  ipAddress: z.ipv4().optional(),
});

export const loginRequestSchema = deviceInformationSchema.extend({
  identifier: z.email(),
  password: z.string().min(1),
});

export const registerRequestSchema = deviceInformationSchema.extend({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export type User = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type DeviceInformation = z.infer<typeof deviceInformationSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
