import { Session } from "next-auth"
import { z } from "zod"

import { db } from "@/lib/db"
import { postPatchSchema } from "@/lib/validations/post"
import { checkAdminPermission } from "@/app/api/utils"

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const { user, response } = await checkAdminPermission()
    if (response) {
      return response
    }

    if (!(await verifyCurrentUserHasAccessToPost(user, params.postId))) {
      return new Response(null, { status: 403 })
    }

    await db.post.delete({
      where: {
        id: params.postId,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const { user, response } = await checkAdminPermission()
    if (response) {
      return response
    }

    if (!(await verifyCurrentUserHasAccessToPost(user, params.postId))) {
      return new Response(null, { status: 403 })
    }

    const json = await req.json()
    const body = postPatchSchema.parse(json)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToPost(
  user: Session["user"],
  postId: string
) {
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: user.id,
    },
  })

  return count > 0
}
