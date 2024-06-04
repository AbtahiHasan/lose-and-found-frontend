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
export { loginSchema, signUpSchema, updateProfileSchema };
