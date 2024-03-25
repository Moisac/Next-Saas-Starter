  import { redirect } from "next/navigation"
import { getLoggedUser } from "@/lib/queries/user"

interface AuthLayoutProps {
  children?: React.ReactNode
}

export default async function AuthLayout({
  children,
}: AuthLayoutProps) {
  const user = await getLoggedUser()

  if (user && user.email) {
    redirect('/dashboard')
  }

  return children;
}