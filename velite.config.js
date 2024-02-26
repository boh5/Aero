import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { defineCollection, defineConfig, s } from "velite"

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

const authors = defineCollection({
  name: "Author",
  pattern: "authors/*.mdx",
  schema: s
    .object({
      name: s.string(),
      description: s.string().optional(),
      avatar: s.string(),
      twitter: s.string(),
    })
    .transform((data) => ({ ...data, permalink: `/authors/${data.name}` })),
})

const posts = defineCollection({
  name: "Post", // collection type name
  pattern: "blog/*.mdx", // content files glob pattern
  schema: s
    .object({
      title: s.string(), // Zod primitive type
      description: s.string().optional(),
      slug: s.slug("posts"), // validate format, unique in posts collection
      date: s.isodate(), // input Date-like string, output ISO Date string.
      image: s.string(), // input image as string, not process it.
      published: s.boolean().default(true),
      metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
      content: s.mdx(), // transform mdx to html
      authors: s.array(s.string()), // array of strings
    })
    // more additional fields (computed fields)
    .transform((data) => ({ ...data, permalink: `/blog/${data.slug}` })),
})

export default defineConfig({
  collections: {
    posts,
    authors,
  },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted")
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"]
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
})
