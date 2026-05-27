import { Skeleton } from '@heroui/react'

const FilaVentaCargando = ({ indice }) => (
  <article className="border-b border-slate-100" key={indice}>
    <div className="grid gap-4 px-8 py-5 lg:grid-cols-[1fr_1fr_120px_160px_130px] lg:items-center">
      <div>
        <Skeleton className="h-6 w-24 rounded-md" />
        <Skeleton className="mt-2 h-4 w-28 rounded-md" />
      </div>
      <div>
        <Skeleton className="h-5 w-44 rounded-md" />
        <Skeleton className="mt-2 h-4 w-36 rounded-md" />
      </div>
      <Skeleton className="h-5 w-14 rounded-md" />
      <Skeleton className="h-6 w-24 rounded-md" />
      <Skeleton className="h-8 w-24 rounded-md" />
    </div>
  </article>
)

const FilasVentasCargando = () =>
  [1, 2, 3].map((indice) => <FilaVentaCargando indice={indice} key={indice} />)

export default FilasVentasCargando
