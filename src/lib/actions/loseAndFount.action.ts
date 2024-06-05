import { config } from "@/config";

const getRecentPost = async () => {
  const res = await fetch(`${config.baseUrl}/lose-item/get-lose-items`, {
    method: "GET",
    next: { tags: ["found-items"] },
  });

  return res.json();
};

export { getRecentPost };
