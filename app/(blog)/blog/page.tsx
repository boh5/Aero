import { posts } from "@/.velite"

import { PostCard } from "@/components/post-card"

export default async function BlogPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard post={post} index={index} />
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}
