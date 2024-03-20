import { LucideIcon } from "lucide-react"


export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  label?: string
  variant: "default" | "ghost"
  disabled?: boolean
  external?: boolean
  icon?: LucideIcon
  href: string
}