import { Skeleton } from '@heroui/react'

const FilaPedidoCargando = ({ indice }) => (
  <tr className="border-t border-slate-100" key={indice}>
    <td className="px-8 py-5">
      <Skeleton className="h-6 w-28 rounded-md" />
      <Skeleton className="mt-2 h-3 w-20 rounded-md" />
    </td>
    <td className="px-8 py-5">
      <Skeleton className="h-5 w-32 rounded-md" />
    </td>
    <td className="px-8 py-5">
      <Skeleton className="h-6 w-24 rounded-md" />
    </td>
    <td className="px-8 py-5">
      <Skeleton className="ml-auto h-8 w-28 rounded-md" />
    </td>
  </tr>
)

const FilasPedidosCargando = () =>
  [1, 2, 3].map((indice) => <FilaPedidoCargando indice={indice} key={indice} />)

export default FilasPedidosCargando
