import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getDashboardConfig } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"

export async function DashboardHeader() {
  const user = await getCurrentUser()

  if (!user) {
    return redirect(authOptions?.pages?.signIn || "/login")
  }

  const dashboardConfig = getDashboardConfig(user.isAdmin)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between space-x-4">
        <MainNav items={dashboardConfig.mainNav} />
        <UserAccountNav
          user={{
            name: user.name,
            image: user.image,
            email: user.email,
          }}
        />
      </div>
    </header>
  )
}
