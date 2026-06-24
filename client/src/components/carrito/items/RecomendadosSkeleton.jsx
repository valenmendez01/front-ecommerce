import { Skeleton } from "@heroui/react";

export default function RecomendadosSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="rounded-lg bg-green-primary p-3">
          <Skeleton className="h-48 w-full rounded-md sm:h-40 xl:h-44" />
          <Skeleton className="mt-2 h-3 w-3/4 rounded" />
          <Skeleton className="mt-2 h-4 w-1/2 rounded" />
          <Skeleton className="mt-1.5 h-3 w-1/3 rounded" />
        </div>
      ))}
    </div>
  );
}
