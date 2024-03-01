import { z } from "zod"

import { db } from "@/lib/db"
import { checkAdminPermission } from "@/app/api/utils"

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function GET() {
  try {
    const { user, response } = await checkAdminPermission()
    if (response) {
      return response
    }

    const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      where: {
        authorId: user.id,
      },
    })
    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { user, response } = await checkAdminPermission()
    if (response) {
      return response
    }

    const json = await req.json()
    const body = postCreateSchema.parse(json)

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(post), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
