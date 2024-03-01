import { redirect } from "next/navigation"

import { adminDashboardConfig } from "@/config/dashboard"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getDashboardConfig } from "@/lib/utils"
import { DashboardHeader } from "@/components/dashboard-header"
import { Nav } from "@/components/dashboard/nav"
import { SiteFooter } from "@/components/site-footer"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return redirect(authOptions?.pages?.signIn || "/login")
  }

  const dashboardConfig = getDashboardConfig(user.isAdmin)

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <DashboardHeader />
      <div className="container grid flex-1 grid-cols-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="flex-col md:flex md:w-[200px]">
          <Nav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
