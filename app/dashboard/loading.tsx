import { CardSkeleton } from "@/components/common/skeletons"

export default function DashboardLoading() {
  return (
    <div>
      <div className="rounded-md grid grid-cols-3 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}