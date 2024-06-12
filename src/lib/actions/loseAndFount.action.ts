"use server";
import { config } from "@/config";
import { getToken } from "@/lib/getToken";
import { loseAndFoundItemSchema } from "@/lib/schema/loseAndFound.schema";
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
const submitLoseItem = async (
  payload: z.infer<typeof loseAndFoundItemSchema>
) => {
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
const getMyLoseItems = async () => {
  try {
    const token = await getToken();

    const res = await fetch(`${config.baseUrl}/lose-item/get-my-lose-items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },

      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (error) {}
};

const submitFoundItem = async (
  payload: z.infer<typeof loseAndFoundItemSchema>
) => {
  try {
    console.log(65, { payload });
    const token = await getToken();

    const res = await fetch(`${config.baseUrl}/found-item/submit-found-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await res.json();
    console.log(79, { data });

    return data;
  } catch (error) {}
};

const getMyFoundItems = async () => {
  try {
    const token = await getToken();

    const res = await fetch(`${config.baseUrl}/found-item/get-my-found-items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },

      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (error) {}
};

const claim = async ({ id, description }: any) => {
  try {
    const rawFormData = {
      id,
      description,
    };
    const token = await getToken();
    const res = await fetch(`${config.baseUrl}/found-item/claim-found-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(rawFormData),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {}
};
const getMyClaims = async () => {
  try {
    const token = await getToken();
    const res = await fetch(`${config.baseUrl}/found-item/get-my-claims`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },

      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {}
};

export {
  getRecentPost,
  submitLoseItem,
  getMyLoseItems,
  submitFoundItem,
  getMyFoundItems,
  claim,
  getMyClaims,
};
