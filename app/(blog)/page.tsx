import { siteConfig } from "@/config/site"
import { HomeCarousel } from "@/components/home-carousel"

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {siteConfig.description}
          </p>
          <div className="mx-4 max-w-[64rem]">
            <HomeCarousel />
          </div>
        </div>
      </section>
      <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"></section>
    </>
  )
}
