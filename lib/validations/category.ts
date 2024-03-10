import { z } from "zod"

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(32),
})

export const categoryUpdateSchema = z.object({
  name: z.string().min(3).max(32),
})
