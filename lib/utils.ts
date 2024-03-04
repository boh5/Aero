import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { adminDashboardConfig, userDashboardConfig } from "@/config/dashboard"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(permalink: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${permalink}`
}

export function getDashboardConfig(isAdmin: boolean) {
  if (isAdmin) {
    return adminDashboardConfig
  }

  return userDashboardConfig
}
