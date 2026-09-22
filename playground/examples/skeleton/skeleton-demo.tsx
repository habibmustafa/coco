import { Skeleton } from '../../../src'

export default function SkeletonDemo() {
  return (
    <div className="flex w-full items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}
