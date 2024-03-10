import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeading } from "@/components/dashboard/heading"

export default function DashboardCategoriesLoading() {
  return (
    <DashboardShell>
      <DashboardHeading heading="Categories" text="Manage your categories." />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
