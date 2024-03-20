import { LucideIcon } from "lucide-react"
import { MainNavItem, SidebarNavItem } from "./layout"

type Logo = {
  src: string
  alt: string
  width: number
  height: number
}

export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    mailSupport: string
    links: {
      twitter: string
      github: string
    }
  }
  
  export type DocsConfig = {
    mainNav: MainNavItem[]
    sidebarNav: SidebarNavItem[]
  }
  
  export type MarketingConfig = {
    mainNav: MainNavItem[]
  }
  
  export type DashboardConfig = {
    mainNav: MainNavItem[]
    sidebarNav: {
      title: string;
      logo: Logo;
      collapsedLogo: Logo;
      closeIcon: LucideIcon;
      openIcon: LucideIcon;
      links: SidebarNavItem[]
    }
  }