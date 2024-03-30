'use client'

import Link from "next/link"
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCallback, useState } from "react"
import { dashboardConfig } from "@/config/dashboard"
import { Separator } from "../ui/separator"
import { usePathname } from 'next/navigation'

export function SidebarNav() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const { sidebarNav } = dashboardConfig;

  const handleSidebarCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const getLinkStatus = useCallback((href: string | undefined) => {
    return href === pathname ? "default" : "ghost";
  }, [pathname])


  return (
    <aside className="hidden flex-col md:flex px-4 min-h-screen bg-card border-r">
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2"
      >
        <nav className="flex flex-col gap-4">
       <Link href="/">
        { isCollapsed ? 
            (
              <Image 
                src={sidebarNav.collapsedLogo.src} 
                alt={sidebarNav.collapsedLogo.alt} 
                width={sidebarNav.collapsedLogo.width} 
                height={sidebarNav.collapsedLogo.height}
                priority={false}
                className="m-auto ease-in-out duration-200"
            />
            ) :
            (
              <Image 
                src={sidebarNav.logo.src} 
                alt={sidebarNav.logo.alt} 
                width={sidebarNav.logo.width} 
                height={sidebarNav.logo.height}
                priority={false}
                className="m-auto ease-in-out duration-200"
            />
            )
          }
       </Link>

        <Separator />

        <div className="flex gap-2 items-center justify-between">
          { !isCollapsed && <b>{ sidebarNav.title }</b>}
          <Button variant="outline" size="icon" onClick={handleSidebarCollapse}>
            { isCollapsed ? <sidebarNav.closeIcon /> : <sidebarNav.openIcon />}
          </Button>
        </div>

          <Separator />
        
          <div className="flex flex-col gap-1">
            {sidebarNav.links.map((link) =>
                isCollapsed ? (
                  <TooltipProvider key={link.title}>
                      <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                              <Link
                                href={link.href}
                                className={cn(
                                    buttonVariants({ variant: getLinkStatus(link.href), size: "icon" }),
                                    "h-9 w-9",
                                    link.variant === "default" &&
                                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                )}
                              >
                              <link.icon className="h-4 w-4" />
                              <span className="sr-only">{link.title}</span>
                              </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="flex items-center gap-4">
                              {link.title}
                              {link.label && (
                              <span className="ml-auto text-muted-foreground">
                                  {link.label}
                              </span>
                              )}
                          </TooltipContent>
                          </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={cn(
                      buttonVariants({ variant:  getLinkStatus(link.href), size: "sm" }),
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                      "justify-start min-w-[200px]"
                    )}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.title}
                    {link.label && (
                      <span
                        className={cn(
                          "ml-auto",
                          link.variant === "default" &&
                            "text-background dark:text-white"
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </Link>
                )
              )}
          </div>
        </nav>
      </div>
    </aside>  
  )
}