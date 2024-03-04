import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeading } from "@/components/dashboard/heading"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeading
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
