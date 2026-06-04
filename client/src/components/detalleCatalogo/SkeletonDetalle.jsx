import { Card, Skeleton } from "@heroui/react";

export const SkeletonDetalle = () => {
  return (
    <div className="mb-8">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] items-stretch gap-6">

          {/* Izquierda — galería */}
          <div className="flex flex-col items-center gap-6">
            {/* Imagen principal */}
            <Skeleton className="rounded-xl">
              <div className="w-[220px] h-[280px]" />
            </Skeleton>

            {/* Miniaturas */}
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="rounded-xl">
                  <div className="w-[50px] h-[65px]" />
                </Skeleton>
              ))}
            </div>
          </div>

          {/* Derecha — info + acciones */}
          <div className="flex flex-col gap-5 px-8">

            {/* Categoría + Volver */}
            <div className="flex items-center justify-between">
              <Skeleton className="rounded w-24 h-3" />
              <Skeleton className="rounded-lg w-20 h-8" />
            </div>

            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded w-3/4 h-6" />
              <Skeleton className="rounded w-1/2 h-6" />
            </div>

            {/* Precio */}
            <div className="flex items-center gap-3">
              <Skeleton className="rounded w-28 h-8" />
              <Skeleton className="rounded w-16 h-5" />
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded w-full h-3" />
              <Skeleton className="rounded w-full h-3" />
              <Skeleton className="rounded w-2/3 h-3" />
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <Skeleton className="rounded-full w-2 h-2" />
              <Skeleton className="rounded w-32 h-3" />
            </div>

            {/* Divider */}
            <Skeleton className="rounded w-full h-px" />

            {/* Acciones — cantidad + botón */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="rounded w-16 h-3" />
                <Skeleton className="rounded-lg w-24 h-8" />
              </div>
              <Skeleton className="rounded-xl w-full h-10" />
            </div>

          </div>
        </div>
      </Card>
    </div>
  );
};