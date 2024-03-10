import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryDeleteDialog } from "@/components/dashboard/categories/category-delete-dialog"
import { CategoryManagementDialog } from "@/components/dashboard/categories/category-management-dialog"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeading } from "@/components/dashboard/heading"

export const metadata = {
  title: "Categories",
  description: "Manage your categories.",
}

export default async function CategoriesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeading heading="Categories" text="Manage your categories.">
        <CategoryManagementDialog />
      </DashboardHeading>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <Card className="w-[250px]">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>

              <CardFooter className="flex justify-between">
                <CategoryDeleteDialog category={category} />
                <CategoryManagementDialog
                  category={category}
                  variant="outline"
                />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
