import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex space-x-4">
        <Skeleton className="h-10 w-44"></Skeleton>
        <Skeleton className="h-10 w-24"></Skeleton>
      </div>

      <div className="flex space-y-4 flex-col">
        <Skeleton className="h-8 w-full"></Skeleton>
        <Skeleton className="h-[65vh] w-full"></Skeleton>
        <Skeleton className="h-8 w-full"></Skeleton>
      </div>
    </div>
  );
}
