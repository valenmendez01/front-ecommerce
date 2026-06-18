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
  <div className={cn("bg-dorado-primary p-1", compacto ? "rounded-[1rem]" : "rounded-[1.35rem]")}>
    <div className={cn("overflow-hidden bg-[#f7f3e8]", compacto ? "aspect-[3/4] rounded-[0.8rem] p-1.5" : "aspect-[4/5] rounded-[1.1rem]")}>
      <Image
        alt={producto.nombre}
        className={cn("h-full w-full", compacto ? "object-contain" : "object-cover")}
        removeWrapper
        src={obtenerImagenProducto(producto)}
      />
    </div>
  </div>
)

export const EtiquetasDestacado = ({ compacto, producto }) => {
  const descuento = obtenerDescuento(producto)

  return (
    <div className={cn("flex items-center justify-between gap-3", compacto ? "mt-3" : "mt-4")}>
      <Chip className={cn("bg-dorado-primary/20 font-black uppercase text-green-primary", compacto && "text-[0.65rem]")} size="sm">
        {formatearCategoria(producto.categoria)}
      </Chip>
      {descuento > 0 && (
        <Chip className={cn("bg-green-primary text-dorado-primary", compacto && "text-[0.65rem]")} size="sm">
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
      className={cn("bg-green-primary font-black text-dorado-primary", compacto ? "h-8 px-4" : "h-9 px-5")}
      radius="full"
      size="sm"
      to={`/productos/${producto.idProducto}`}
    >
      Ver producto
    </Button>
  </HoverBorderGradient>
)
