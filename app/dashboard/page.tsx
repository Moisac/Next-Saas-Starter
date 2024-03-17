import { DashboardHeader } from "@/components/dashboard/header"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {

  return (
    <DashboardHeader heading="Panel" text="Create and manage content." />
  )
}