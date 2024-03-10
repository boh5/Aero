"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { categorySchema } from "@/lib/validations/category"
import { postPublishSchema } from "@/lib/validations/post"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { CategorySelector } from "@/components/editor/category-selector"
import { Icons } from "@/components/icons"

interface PublishDialogProps {
  post: Post
}

export async function PostPublishDialog({ post }: PublishDialogProps) {
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const [open, setOpen] = useState(!!searchParams.get("publish"))

  const form = useForm<z.infer<typeof postPublishSchema>>({
    resolver: zodResolver(postPublishSchema),
    defaultValues: {
      category_id: post.categoryId,
      ...post,
    },
  })

  async function onSubmit(data: z.infer<typeof postPublishSchema>) {
    setIsSaving(true)

    const response = await fetch(`/api/posts/${post.id}/publish`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        preview_image: data.preview_image,
        category_id: data.category_id,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      console.log(await response.json())
      return toast({
        title: "Failed to publish post",
        description:
          "An error occurred while saving your post. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your post has been published.",
    })

    router.push(`/blogs/${post.id}`)
  }

  const [categories, setCategories] = useState<
    z.infer<typeof categorySchema>[]
  >([])

  useEffect(() => {
    async function fetchCategories(query?: string) {
      const params = new URLSearchParams()
      if (query) {
        params.append("query", query)
      }
      const response = await fetch(`/api/categories?${params.toString()}`)
      const data = await response.json()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Publish</Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen h-screen border-none">
        <DialogHeader>
          <DialogTitle>Publish post</DialogTitle>
          <DialogDescription>
            Publish your post to make it live for readers to see.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container grid flex-1 gap-4 md:grid-cols-2"
          >
            <div className="grid gap-1">
              {post.preview_image ? (
                <Image
                  src={post.preview_image}
                  alt="preview image"
                  height={180}
                  width={300}
                />
              ) : (
                <div className="flex h-[180px] w-[300px] items-center justify-center bg-muted">
                  <p className="m-8 text-muted-foreground">
                    Include a high-quality image in your post to make it more
                    inviting to readers.
                  </p>
                </div>
              )}
              <Separator />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Add a title to your post to make it more inviting to
                      readers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormDescription>
                      Add a description to your post to give readers a preview
                      of what it&apos;s about.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>
                    <CategorySelector
                      form={form}
                      field={field}
                      categories={categories}
                    />
                    <FormDescription>
                      Choose a category to help readers find your post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isSaving && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Publish
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
