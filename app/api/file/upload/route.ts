import formidable, { errors as formidableErrors } from "formidable"

import { formidableConfig } from "@/config/formidable"
import { checkPermission } from "@/app/api/utils"

export async function POST(req: Request) {
  try {
    const { user, response } = await checkPermission(true)
    if (response) {
      return response
    }

    const form = formidable(formidableConfig)

    const data = await req.formData()

    const [fields, files] = await form.parse(req)
  } catch (error) {
    console.log(error)
    if (error instanceof formidableErrors) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
  }
}
