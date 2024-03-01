import { Metadata } from "next"
import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { PostCreateButton } from "@/components/dashboard/post/post-create-button"
import { PostItem } from "@/components/dashboard/post/post-item"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata: Metadata = {
  title: "Posts",
  description: "Create and manage posts.",
}

export default async function PostPage() {
  const user = await getCurrentUser()

  if (!user.isAdmin) {
    return notFound()
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  console.log("query posts", `post count: ${posts.length}`)
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div>
        {posts.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
