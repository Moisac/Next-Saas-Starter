import { UserInvoicesTable } from "@/components/dashboard/subscription/user-invoices-table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getUserInvoices } from "@/lib/queries/stripe/get-user-invoices"
import { getLoggedUser } from "@/lib/queries/user"
import { TriangleAlert } from "lucide-react"
import { redirect } from "next/navigation"

export const metadata = {
    title: "User invoices",
    description: "View user invoices.",
  }


export default async function InvoicesPage() {
    const user = await getLoggedUser()

    if (!user && !user?.id) {
      redirect("/login")
    }
  
    const userInvoices = await getUserInvoices(user?.stripeCustomerId)

    return (
        <>
            { userInvoices?.length ? <UserInvoicesTable data={userInvoices} /> : 
                (
                    <Alert variant="info" className="!pl-14">
                        <TriangleAlert />
                        <AlertTitle>No invoices  found.</AlertTitle>
                        <AlertDescription>
                            Could not find invoices associated with your account.
                        </AlertDescription>
                    </Alert>
                )
            }
        </>
    )
}