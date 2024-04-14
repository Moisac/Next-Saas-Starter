import type { DashboardConfig } from "@/types/config"
import {  BarChartBig, CreditCard, PanelLeftClose, PanelLeftOpen, Receipt } from "lucide-react"

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
        title: "Subscription",
        icon: CreditCard,
        variant: "default",
        href: "/dashboard/subscription",
      },
      {
        title: "Invoices",
        icon: Receipt,
        variant: "default",
        href: "/dashboard/invoices",
      },
    ],
  }
}