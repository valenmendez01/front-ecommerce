import { Skeleton } from '@heroui/react'

const TarjetaProductoCargando = ({ indice }) => (
  <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={indice}>
    <div className="flex flex-col gap-6 md:flex-row md:items-center">
      <Skeleton className="h-28 w-28 shrink-0 rounded-md" />
      <div className="min-w-0 flex-1">
        <Skeleton className="h-6 w-4/5 rounded-md" />
        <Skeleton className="mt-3 h-5 w-24 rounded-full" />
        <Skeleton className="mt-4 h-5 w-32 rounded-md" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  </article>
)

const TarjetasProductosCargando = () =>
  [1, 2].map((indice) => <TarjetaProductoCargando indice={indice} key={indice} />)

export default TarjetasProductosCargando
