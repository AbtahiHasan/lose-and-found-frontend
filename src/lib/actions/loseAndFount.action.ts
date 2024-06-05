"use server";
import { config } from "@/config";
import { getToken } from "@/lib/getToken";
import { loseItemSchema } from "@/lib/schema/loseAndFound.schema";
import { z } from "zod";

const getRecentPost = async () => {
  try {
    const res = await fetch(`${config.baseUrl}/lose-item/get-lose-items`, {
      cache: "no-cache",
      credentials: "include",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log({ error });
  }
};
const submitLoseItem = async (payload: z.infer<typeof loseItemSchema>) => {
  try {
    const token = await getToken();

    const res = await fetch(`${config.baseUrl}/lose-item/submit-lose-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (error) {}
};

export { getRecentPost, submitLoseItem };
