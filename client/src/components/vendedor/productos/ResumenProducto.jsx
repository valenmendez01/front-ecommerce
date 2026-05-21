import { Button, Chip } from '@heroui/react'
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { obtenerEstadoProducto } from '../../../data/reglasProducto'
import { coloresEstadoProducto } from './estilosProducto'
import PrecioConDescuento from './PrecioConDescuento'

const ResumenProducto = ({ abierto, eliminando, guardando, onAbrir, onEliminar, producto }) => {
  const estado = obtenerEstadoProducto(producto)

  return (
    <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#061d58] text-2xl font-black text-white shadow-md">
        {producto.imagenUrl ? (
          <img alt={producto.nombre} className="h-full w-full object-cover" src={producto.imagenUrl} />
        ) : (
          producto.imagen
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-black text-[#0b2b88]">{producto.nombre}</h3>
          <Chip className={`${coloresEstadoProducto[estado]} font-bold`} radius="full" size="sm">
            {estado}
          </Chip>
        </div>
        <p className="mt-1 text-sm text-slate-400">#{producto.idProducto}</p>
        <div className="mt-3"><PrecioConDescuento compacto producto={producto} /></div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button
          className="bg-blue-50 text-sm font-bold text-[#0b2b88]"
          endContent={abierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          radius="sm"
          size="sm"
          onPress={onAbrir}
        >
          Detalle
        </Button>
        <Button
          isIconOnly
          aria-label={`Desactivar ${producto.nombre}`}
          className="bg-red-50 text-red-700"
          isDisabled={guardando || eliminando}
          isLoading={eliminando}
          radius="sm"
          size="sm"
          onPress={onEliminar}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  )
}

export default ResumenProducto
