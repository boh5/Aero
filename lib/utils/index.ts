import { clsx, type ClassValue } from "clsx"
import { Session } from "next-auth"
import { twMerge } from "tailwind-merge"

import { adminDashboardConfig, userDashboardConfig } from "@/config/dashboard"
import { db } from "@/lib/db"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(permalink: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${permalink}`
}

export function getDashboardConfig(isAdmin: boolean) {
  if (isAdmin) {
    return adminDashboardConfig
  }

  return userDashboardConfig
}

export async function verifyCurrentUserHasAccessToPost(
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

export * from "./tiptap/cssVar"
export * from "./tiptap/getRenderContainer"
export * from "./tiptap/isCustomNodeSelected"
export * from "./tiptap/isTextSelected"
