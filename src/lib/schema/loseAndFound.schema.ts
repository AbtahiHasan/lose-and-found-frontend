import { z } from "zod";

const loseItemSchema = z.object({
  category: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  email: z.string().email(),
  image: z.any(),
});

export { loseItemSchema };
