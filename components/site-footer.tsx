import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Build with ❤️ &{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Next.js
            </a>{" "}
            &{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn-ui
            </a>{" "}
            &{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Tailwindcss
            </a>{" "}
            by{" "}
            <a
              href="https://bo.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              bo
            </a>
            . Inspired by{" "}
            <a
              href="https://github.com/shadcn-ui/taxonomy"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              taxonomy
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
