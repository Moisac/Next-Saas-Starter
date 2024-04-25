import { UsersTable } from "@/components/dashboard/user/users-table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getLoggedUser, getUsersList } from "@/lib/queries/user"
import { Role, User } from "@/types/user"
import { TriangleAlert } from "lucide-react"
import { redirect } from "next/navigation"

export const metadata = {
    title: "Users list",
    description: "Manage your users.",
  }


export default async function UsersPage() {
    const user = await getLoggedUser()

    if (!user && !user?.id) {
      redirect("/login")
    }

    if(user && user?.id && user?.role !== Role.ADMIN) {
        redirect("/dashboard")
    }

    const users = await getUsersList()

    return (
        <>
            { users?.length ? <UsersTable data={users} /> : 
                (
                    <Alert variant="info" className="!pl-14">
                        <TriangleAlert />
                        <AlertTitle>No users  found.</AlertTitle>
                        <AlertDescription>
                            Could not find users.
                        </AlertDescription>
                    </Alert>
                )
            }
        </>
    )
}