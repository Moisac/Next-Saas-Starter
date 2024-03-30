import { redirect } from "next/navigation"
import { getLoggedUser } from "@/lib/queries/user"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { User } from "@/types/user"
import { Suspense } from "react"
import { DashboardHeaderSkeleton } from "@/components/common/skeletons"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getLoggedUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="flex gap-1">
        <SidebarNav />
        <main className="flex flex-1 flex-col overflow-hidden">
          <Suspense fallback={<DashboardHeaderSkeleton />}>
            <DashboardHeader user={user as User} />
          </Suspense>
          <div id="content" className="p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}