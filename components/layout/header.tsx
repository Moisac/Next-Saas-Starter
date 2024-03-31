import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user/user-nav"
import Link from "next/link"
import { getLoggedUser } from "@/lib/queries/user"
import { User } from "@/types/user"

export async function Header() {
  const user = await getLoggedUser()

  return (
    <header className="w-full border-b">
        <div className="flex justify-between p-4">
          <div className="main-menu">Menu</div>
          <div className="flex gap-5">
              { user ? <UserNav user={user as User} /> :
                <Button variant="outline" asChild>
                  <Link
                    href="/login"
                  >
                    Login
                  </Link>
                </Button>     
            }
          </div>
        </div>
    </header>
  )
}
