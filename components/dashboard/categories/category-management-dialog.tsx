"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { categoryUpdateSchema } from "@/lib/validations/category"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

interface categoryManagementDialogProps extends ButtonProps {
  category?: Category
}

export function CategoryManagementDialog({
  className,
  variant,
  category,
  ...props
}: categoryManagementDialogProps) {
  const isUpdate = !!category

  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof categoryUpdateSchema>>({
    resolver: zodResolver(categoryUpdateSchema),
    defaultValues: category,
  })

  function onSubmit(values: z.infer<typeof categoryUpdateSchema>) {
    const url = isUpdate ? `/api/categories/${category.id}` : "/api/categories"
    const method = isUpdate ? "PATCH" : "POST"

    setIsSaving(true)

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    setIsSaving(false)
    setOpen(false)

    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className={className} variant={variant} {...props}>
          {" "}
          {isUpdate ? "Update" : "Create"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Update category" : "Create category"}
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Update your category details."
              : "Create a new category."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="cateogry name" {...field} />
                  </FormControl>
                  <FormDescription>Name of the category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {isSaving && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isUpdate ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
