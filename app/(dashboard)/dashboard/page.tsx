import { Metadata } from "next"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/header"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your data.",
}

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Mange your data."
      ></DashboardHeader>
    </DashboardShell>
  )
}
