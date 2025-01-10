import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string(),
  department: z.string(),
  comments: z.string(),
});
