import { Metadata } from "next"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeading } from "@/components/dashboard/heading"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your data.",
}

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeading
        heading="Dashboard"
        text="Mange your data."
      ></DashboardHeading>
    </DashboardShell>
  )
}
