import Link from "next/link"
import { Post } from "@prisma/client"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { PostOperations } from "@/components/dashboard/posts/post-operations"

interface PostItemProps {
  post: Pick<Post, "id" | "title" | "published" | "createdAt">
}

export function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          {formatDate(post.createdAt?.toDateString())}
        </p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          {post.published ? "Published" : "Draft"}
        </p>
      </div>
      <PostOperations post={post} />
    </div>
  )
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
