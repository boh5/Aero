"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Category } from "@prisma/client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, ButtonProps } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface CategoryDeleteButtonProps extends ButtonProps {
  category: Category
}

export function CategoryDeleteDialog({
  category,
  className,
  ...props
}: CategoryDeleteButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  async function deleteCategory(categoryId: string) {
    setIsLoading(true)

    const response = await fetch(`/api/categories/${category.id}`, {
      method: "DELETE",
    })

    setIsLoading(false)

    if (!response.ok) {
      const data = await response.json()

      return toast({
        title: "Something went wrong.",
        description:
          data.message || "Your category was not deleted. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()
  }

  return (
    <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this post?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (event) => {
              event.preventDefault()
              setIsLoading(true)
              const deleted = await deleteCategory(category.id)

              if (deleted) {
                setIsLoading(false)
                setShowDeleteAlert(false)
                router.refresh()
              }
            }}
            className="bg-red-600 focus:ring-red-600"
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
