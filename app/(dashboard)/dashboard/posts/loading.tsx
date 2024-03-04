import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeading } from "@/components/dashboard/heading"
import { PostCreateButton } from "@/components/dashboard/posts/post-create-button"
import { PostItem } from "@/components/dashboard/posts/post-item"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeading heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeading>
      <div className="divide-border-200 divide-y rounded-md border">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
