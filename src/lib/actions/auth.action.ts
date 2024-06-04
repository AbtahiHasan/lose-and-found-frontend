"use server";
import { z } from "zod";
import { loginSchema, signUpSchema } from "@/lib/schema";
import { config } from "@/config";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import {
  updatePasswordSchema,
  updateProfileSchema,
} from "@/lib/schema/auth.schema";
import { getToken } from "@/lib/getToken";

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

const updateToken = async () => {
  const token = await getToken();

  const res = await fetch(`${config.baseUrl}/auth/update-token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },

    credentials: "include",
  });
  const data = await res.json();

  if (data?.success) {
    console.log({ token: data?.data?.token });
    // cookies().delete("token");
    cookies().set("token", data?.data?.token);
    console.log("token set");
  }
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
const updateProfile = async (payload: z.infer<typeof updateProfileSchema>) => {
  const token = await getToken();

  const res = await fetch(`${config.baseUrl}/auth/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await res.json();

  if (data?.success) {
    await updateToken();
  }

  return data;
};
const changePassword = async (
  payload: z.infer<typeof updatePasswordSchema>
) => {
  const token = await getToken();

  const res = await fetch(`${config.baseUrl}/auth/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await res.json();

  return data;
};

export {
  login,
  signUp,
  getUser,
  logout,
  updateProfile,
  updateToken,
  changePassword,
};
