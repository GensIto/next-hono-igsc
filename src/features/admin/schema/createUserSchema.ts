import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  is_admin: z.boolean().optional(),
  department: z.string(),
  name: z.string(),
});
