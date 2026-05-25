import { Skeleton } from "@heroui/react"

const TarjetaProductoDestacadoSkeleton = () => (
  <article className="rounded-[1.75rem] border border-dorado-primary/20 bg-white p-5 shadow-lg">
    <Skeleton className="h-64 rounded-[1.25rem]" />
    <div className="mt-5 flex justify-between">
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-6 w-14 rounded-full" />
    </div>
    <Skeleton className="mt-5 h-7 w-10/12 rounded-lg" />
    <Skeleton className="mt-3 h-7 w-7/12 rounded-lg" />
    <div className="mt-8 flex items-end justify-between">
      <div className="space-y-2">
        <Skeleton className="h-3 w-16 rounded-lg" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>
      <Skeleton className="h-9 w-28 rounded-full" />
    </div>
  </article>
)

export default TarjetaProductoDestacadoSkeleton
