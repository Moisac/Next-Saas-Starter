import { UpdateUser } from "@/components/dashboard/user/update-user"
import { getLoggedUser } from "@/lib/queries/user"
import { User } from "@/types/user"

export const metadata = {
    title: "Account",
  }
  
  export default async function AccountPage() {

    const user = await getLoggedUser()
    return (
       <div>
        <UpdateUser user={user as User} />
       </div>
    )
  }