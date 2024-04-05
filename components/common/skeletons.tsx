import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Slash } from "lucide-react"

export function CardSkeleton({className}: {className?: string}) {
  return (
    <Card className={className ?? ''}>
      <CardHeader>
        <Skeleton className="h-5" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  )
}

export function DashboardHeaderSkeleton() {
  return (
    <Card className="flex justify-between px-4 py-2 mb-4">
       <div className="flex items-center gap-1">
        <Skeleton className="h-5 w-20" /> <Slash className="w-4 h-4" />
        <Skeleton className="h-5 w-20" /> <Slash className="w-4 h-4" />
        <Skeleton className="h-5 w-20" />
      </div>
        <Skeleton className="h-12 w-12 rounded-full" />
    </Card>
  )
}