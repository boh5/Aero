import { z } from "zod"

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})

export const postPublishSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  description: z.string().min(3).max(256).optional(),
  preview_image: z.string().url().optional().nullable(),
  category_id: z.string().min(3).max(32).optional(),
  tags: z.array(z.string().min(3).max(32)).optional(),
})
