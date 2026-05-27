import { Button, Chip, Tooltip } from '@heroui/react'
import { ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react'
import PrecioConDescuento from '../detalle/PrecioConDescuento'
import { obtenerEstadoProductoVendedor } from '../datos/reglasProductoVendedor'

const coloresEstadoProducto = {
  ACTIVO: 'bg-dorado-primary/25 text-green-primary',
  'STOCK BAJO': 'bg-dorado-primary/30 text-green-primary',
  'SIN STOCK': 'bg-red-100 text-red-700',
  INACTIVO: 'bg-slate-200 text-slate-600',
}

const ResumenProducto = ({ abierto, cambiandoVisibilidad, guardando, onAbrir, onCambiarVisibilidad, producto }) => {
  const estado = obtenerEstadoProductoVendedor(producto)

  return (
    <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
      <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-md bg-green-primary text-2xl font-black text-dorado-primary shadow-md">
        {producto.imagenUrl ? (
          <img alt={producto.nombre} className="h-full w-full bg-white object-contain" src={producto.imagenUrl} />
        ) : (
          producto.imagen
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-black text-green-primary">{producto.nombre}</h3>
          <Chip className={`${coloresEstadoProducto[estado]} font-bold`} radius="full" size="sm">
            {estado}
          </Chip>
        </div>
        <div className="mt-3"><PrecioConDescuento compacto producto={producto} /></div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button
          className="bg-dorado-primary/20 text-sm font-bold text-green-primary"
          endContent={abierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          radius="sm"
          size="sm"
          onPress={onAbrir}
        >
          Detalle
        </Button>
        <Tooltip
          showArrow
          className="bg-green-primary font-semibold text-white"
          content={producto.activo ? 'Ocultar del catálogo' : 'Mostrar en el catálogo'}
          placement="top"
        >
          <Button
            isIconOnly
            aria-label={`${producto.activo ? 'Ocultar' : 'Mostrar'} ${producto.nombre} en el catálogo`}
            className="bg-dorado-primary/20 text-green-primary"
            isDisabled={guardando || cambiandoVisibilidad}
            isLoading={cambiandoVisibilidad}
            radius="sm"
            size="sm"
            onPress={onCambiarVisibilidad}
          >
            {producto.activo ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default ResumenProducto
