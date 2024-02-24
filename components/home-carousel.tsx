"use client"

import React from "react"
import Image from "next/image"
import a from "@/public/carousel/1.png"
import b from "@/public/carousel/2.png"
import c from "@/public/carousel/3.png"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface CarouselProps extends React.HTMLAttributes<HTMLElement> {
  delay?: number
}

export function HomeCarousel({ className, ...props }: CarouselProps) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: props.delay ? props.delay : 3000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <Image src={a} alt="c1" />
        </CarouselItem>
        <CarouselItem>
          <Image src={b} alt="c2" />
        </CarouselItem>
        <CarouselItem>
          <Image src={c} alt="c3" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
