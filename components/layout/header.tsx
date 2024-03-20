import { buttonVariants } from "@/components/ui/button"
import { UserNav } from "@/components/user/user-nav"
import Link from "next/link"
import { getLoggedUser } from "@/lib/queries/user"
import { cn } from "@/lib/utils"

export async function Header() {
  const user = await getLoggedUser()

  return (
    <div className="w-full border-b">
        <div className="flex justify-between p-4">
          <div className="main-menu">Menu</div>
          <div className="flex gap-5">
              { user ? <UserNav user={user} /> :     
               <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline" })
                )}
              >
                Login
              </Link>
            }
          </div>
        </div>
    </div>
  )
}
