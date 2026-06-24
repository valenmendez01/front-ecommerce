import { Button, Chip, Image } from "@heroui/react"
import { Link } from "react-router-dom"
import { cn } from "../../../lib/utils"
import HoverBorderGradient from "../../ui/hover-border-gradient"
import {
  formatearCategoria,
  formatearPesos,
  obtenerDescuento,
  obtenerImagenProducto,
  obtenerPrecioFinal,
} from "./productoDestacadoHomeUtils"

export const ImagenDestacada = ({ compacto, producto }) => (
  <div className={cn(
    "overflow-hidden border-4 border-dorado-primary bg-[#f7f3e8]",
    compacto ? "aspect-[3/4] rounded-[0.95rem]" : "aspect-[3/4] rounded-[1.35rem]",
  )}>
      <Image
        alt={producto.nombre}
        className="h-full w-full object-cover"
        removeWrapper
        src={obtenerImagenProducto(producto)}
      />
  </div>
)

export const EtiquetasDestacado = ({ compacto, producto }) => {
  const descuento = obtenerDescuento(producto)

  return (
    <div className={cn("flex items-center justify-between gap-3", compacto ? "mt-2.5" : "mt-4")}>
      <Chip className={cn("bg-dorado-primary/20 font-black uppercase text-green-primary", compacto && "h-6 text-[0.62rem]")} size="sm">
        {formatearCategoria(producto.categoria)}
      </Chip>
      {descuento > 0 && (
        <Chip className={cn("bg-green-primary text-dorado-primary", compacto && "h-6 text-[0.62rem]")} size="sm">
          -{descuento}%
        </Chip>
      )}
    </div>
  )
}

export const PrecioDestacado = ({ compacto, producto }) => {
  const descuento = obtenerDescuento(producto)
  if (descuento <= 0) {
    return <p className={cn("font-black", compacto ? "text-lg" : "text-xl")}>{formatearPesos(producto.precio)}</p>
  }

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className="text-sm font-black text-green-primary/40 line-through">
        {formatearPesos(producto.precio)}
      </span>
      <span className={cn("font-black text-green-primary", compacto ? "text-lg" : "text-xl")}>
        {formatearPesos(obtenerPrecioFinal(producto))}
      </span>
    </div>
  )
}

export const AccionDestacado = ({ compacto, producto }) => (
  <HoverBorderGradient className="w-fit">
    <Button
      as={Link}
      className={cn("bg-green-primary font-black text-dorado-primary", compacto ? "h-8 px-4 text-xs" : "h-9 px-5")}
      radius="full"
      size="sm"
      to={`/productos/${producto.idProducto}`}
    >
      Ver producto
    </Button>
  </HoverBorderGradient>
)
