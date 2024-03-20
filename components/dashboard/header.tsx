import { buttonVariants } from "@/components/ui/button"
import { UserNav } from "@/components/user/user-nav"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { User } from "@/types/user";

interface IDashboardHeader {
  user: User | null;
}

export async function DashboardHeader({ user }: IDashboardHeader) {

  return (
    <div className="w-full border-b bg-card">
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
