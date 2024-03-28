import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user/user-nav"
import Link from "next/link"
import { User } from "@/types/user";

interface IDashboardHeader {
  user: User | null;
}

export async function DashboardHeader({ user }: IDashboardHeader) {

  return (
    <div className="w-full border-l border-b bg-card">
        <div className="flex justify-between p-4">
          <div className="main-menu">Menu</div>
          <div className="flex gap-5">
              { user ? <UserNav user={user} /> :     
              <Button variant="outline" asChild>
                <Link href="/login">
                  Login
                </Link>
              </Button>
            }
          </div>
        </div>
    </div>
  )
}
