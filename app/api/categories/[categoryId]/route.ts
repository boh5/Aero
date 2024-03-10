import { z } from "zod"

import { db } from "@/lib/db"
import { categoryUpdateSchema } from "@/lib/validations/category"
import { checkPermission } from "@/app/api/utils"

const routeContextSchema = z.object({
  params: z.object({
    categoryId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    console.log(context)
    const { params } = routeContextSchema.parse(context)

    const { response } = await checkPermission(true)
    if (response) {
      return response
    }

    const exist_posts = await db.post.findFirst({
      where: {
        categoryId: params.categoryId,
      },
    })
    if (exist_posts) {
      return new Response(
        JSON.stringify({ message: "Category has posts, cannot delete." }),
        { status: 400 }
      )
    }

    await db.category.delete({
      where: {
        id: params.categoryId,
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

    const { response } = await checkPermission(true)
    if (response) {
      return response
    }

    const json = await req.json()
    const body = categoryUpdateSchema.parse(json)

    await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name: body.name,
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
