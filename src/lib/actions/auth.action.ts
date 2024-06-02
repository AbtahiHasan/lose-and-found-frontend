import { z } from "zod";
import { loginSchema, signUpSchema } from "../schema";

const signUp = async (payload: z.infer<typeof signUpSchema>) => {
  try {
  } catch (error) {}
};
const login = async (payload: z.infer<typeof loginSchema>) => {
  try {
  } catch (error) {}
};

export { login, signUp };
