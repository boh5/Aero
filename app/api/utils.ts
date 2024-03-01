import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

export async function checkAdminPermission() {
  const session = await getServerSession(authOptions)

  let response: Response
  if (!session) {
    response = new Response("Unauthorized", { status: 401 })
  }

  const { user } = session
  if (!user.isAdmin) {
    response = new Response("Permission denied", { status: 403 })
  }

  return { user, response }
}
