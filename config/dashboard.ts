import type { DashboardConfig } from "@/types/config"
import {  BarChartBig, PanelLeftClose, PanelLeftOpen, Settings, Sheet } from "lucide-react"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: {
    title: "Menu",
    logo: {
      src:"/next.svg",
      alt: "Next.js logo",
      width: 150,
      height: 150,
    },
    collapsedLogo: {
      src:"/next-icon.svg",
      alt: "Next.js icon",
      width: 30,
      height: 30,
    },
    closeIcon: PanelLeftOpen,
    openIcon: PanelLeftClose,
    links: [
      {
        title: "Dashboard",
        icon: BarChartBig,
        variant: "default",
        href: "/dashboard",
      },
      {
        title: "Items",
        label: "20",
        icon: Sheet,
        variant: "default",
        href: "/dashboard/items",
      },
      {
        title: "Settings",
        label: "",
        icon: Settings,
        variant: "ghost",
        href: "/dashboard/settings",
      },
    ],
  }
}