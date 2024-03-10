import { NextRequest } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"
import { checkPermission } from "@/app/api/utils"

const categoryListParams = z.object({
  query: z.string().optional(),
})

const categoryCreateSchema = z.object({
  name: z.string().min(3),
})

export async function GET(req: NextRequest) {
  try {
    const params = categoryListParams.parse(req.nextUrl.searchParams)

    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        ...(params.query && { name: { contains: params.query } }),
      },
    })
    return new Response(JSON.stringify(categories))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { user, response } = await checkPermission(true)
    if (response) {
      return response
    }

    const json = await req.json()
    const body = categoryCreateSchema.parse(json)

    const category = await db.category.create({
      data: {
        name: body.name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return new Response(JSON.stringify(category), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.log(error)
    return new Response(null, { status: 500 })
  }
}
