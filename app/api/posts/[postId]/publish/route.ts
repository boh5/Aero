import { z } from "zod"

import { db } from "@/lib/db"
import { verifyCurrentUserHasAccessToPost } from "@/lib/utils"
import { postPublishSchema } from "@/lib/validations/post"
import { checkPermission } from "@/app/api/utils"

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const { user, response } = await checkPermission(true)
    if (response) {
      return response
    }

    if (!(await verifyCurrentUserHasAccessToPost(user, params.postId))) {
      return new Response(null, { status: 403 })
    }

    const json = await req.json()
    const body = postPublishSchema.parse(json)

    // Publish the post.
    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        description: body.description,
        preview_image: body.preview_image,
        categoryId: body.category_id,
        published: true,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
