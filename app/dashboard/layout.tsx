import { notFound } from "next/navigation"
import { DashboardNav } from "@/components/layout/nav"
import { dashboardConfig } from "@/config/dashboard"
import { getLoggedUser } from "@/lib/queries/user"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getLoggedUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
          <b>{ user?.email }</b>
        </main>
      </div>
    </div>
  )
}