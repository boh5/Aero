import { Metadata } from "next"
import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeading } from "@/components/dashboard/heading"
import { PostCreateButton } from "@/components/dashboard/posts/post-create-button"
import { PostItem } from "@/components/dashboard/posts/post-item"
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
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    where: {
      authorId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeading heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeading>
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
