import { z } from "zod";
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const signUpSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const updateProfileSchema = z.object({
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
});
const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1).optional(),
    newPassword: z.string().min(1).optional(),
    confirmPassword: z.string().min(1).optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export { loginSchema, signUpSchema, updateProfileSchema, updatePasswordSchema };
