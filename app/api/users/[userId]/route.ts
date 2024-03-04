import { z } from "zod"

import { db } from "@/lib/db"
import { userNameSchema } from "@/lib/validations/user"
import { checkPermission } from "@/app/api/utils"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const { user, response } = await checkPermission()
    if (response) {
      return response
    }

    const body = await req.json()
    const payload = userNameSchema.parse(body)

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: payload.name,
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
