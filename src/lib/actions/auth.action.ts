"use server";
import { z } from "zod";
import { loginSchema, signUpSchema } from "../schema";
import { config } from "@/config";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const signUp = async (payload: z.infer<typeof signUpSchema>) => {
  try {
    const { username, email, password } = payload;

    const res = await fetch(`${config.baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
    });
    const data = await res.json();

    return data;
  } catch (error) {}
};
const login = async (payload: z.infer<typeof loginSchema>) => {
  try {
    const { email, password } = payload;

    const res = await fetch(`${config.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (data?.success) {
      cookies().set("token", data?.data?.token);
    }

    return data;
  } catch (error) {}
};

const getUser = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  const data = jwtDecode(token);
  return data;
};
const logout = async () => {
  cookies().delete("token");
};

export { login, signUp, getUser, logout };
