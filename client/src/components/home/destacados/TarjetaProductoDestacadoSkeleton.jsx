import { Skeleton } from "@heroui/react"
import { cn } from "../../../lib/utils"

const TarjetaProductoDestacadoSkeleton = ({ compacto = false }) => (
  <article className={cn(
    "border border-dorado-primary/20 bg-white shadow-lg",
    compacto ? "rounded-[1.15rem] p-3" : "rounded-[1.75rem] p-5",
  )}>
    <Skeleton className={cn(
      compacto ? "aspect-[5/6] rounded-[0.7rem]" : "h-64 rounded-[1.25rem]",
    )} />
    <div className={cn("flex justify-between", compacto ? "mt-3" : "mt-5")}>
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-6 w-14 rounded-full" />
    </div>
    <Skeleton className={cn("h-7 w-10/12 rounded-lg", compacto ? "mt-3" : "mt-5")} />
    <Skeleton className={cn("h-7 w-7/12 rounded-lg", compacto ? "mt-2" : "mt-3")} />
    <div className={cn("flex items-end justify-between", compacto ? "mt-5" : "mt-8")}>
      <div className="space-y-2">
        <Skeleton className="h-3 w-16 rounded-lg" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>
      <Skeleton className="h-9 w-28 rounded-full" />
    </div>
  </article>
)

export default TarjetaProductoDestacadoSkeleton
