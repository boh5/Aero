import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { PostCreateButton } from "@/components/dashboard/post/post-create-button"
import { PostItem } from "@/components/dashboard/post/post-item"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
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
