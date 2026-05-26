import { Skeleton } from "@heroui/react";

export default function RecomendadosSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-5">
      {[0, 1, 2].map((item) => (
        <div key={item} className="rounded-xl bg-green-primary p-3">
          <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          <Skeleton className="mt-3 h-3 w-3/4 rounded" />
          <Skeleton className="mt-2 h-4 w-1/2 rounded" />
          <Skeleton className="mt-2 h-3 w-1/3 rounded" />
        </div>
      ))}
    </div>
  );
}
