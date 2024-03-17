import { MainNavItem, SidebarNavItem } from "./layout"

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
    sidebarNav: SidebarNavItem[]
  }