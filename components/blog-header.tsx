import Link from "next/link"

import { blogConfig } from "@/config/blog"
import { siteConfig } from "@/config/site"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { BlogsSearch } from "@/components/search"
import { UserAccountNav } from "@/components/user-account-nav"

export async function BlogHeader() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center space-x-4">
        <MainNav items={blogConfig.mainNav} />
        <div className="flex flex-1 items-center space-x-4 sm:justify-end">
          <div className="flex-1 sm:grow-0">
            <BlogsSearch />
          </div>
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(buttonVariants({ variant: "ghost" }), "w-9 px-0")}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(buttonVariants({ variant: "ghost" }), "w-9 px-0")}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ModeToggle />
            {!user ? (
              <Link href="/login">
                <div
                  className={cn(buttonVariants({ variant: "ghost" }), "px-4")}
                >
                  Login
                </div>
              </Link>
            ) : (
              <UserAccountNav
                user={{
                  name: user.name || null,
                  image: user.image || null,
                  email: user.email || null,
                }}
              />
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
