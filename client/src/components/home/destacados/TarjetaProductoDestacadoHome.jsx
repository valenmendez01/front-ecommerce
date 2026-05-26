import { Button, Chip, Image } from "@heroui/react"
import { Link } from "react-router-dom"
import sinImagen from "../../../assets/sinImagen.png"
import { CometCard } from "../../ui/comet-card"
import HoverBorderGradient from "../../ui/hover-border-gradient"

const obtenerTipoImagen = (contenido = "") => {
  if (contenido.startsWith("iVBORw0KGgo")) return "image/png"
  if (contenido.startsWith("UklGR")) return "image/webp"
  return "image/jpeg"
}

const obtenerImagenProducto = (producto) => {
  const contenido = producto.imagenes?.[0]?.contenidoBase64
  return contenido ? `data:${obtenerTipoImagen(contenido)};base64,${contenido}` : sinImagen
}

const formatearPesos = (precio = 0) =>
  new Intl.NumberFormat("es-AR", { currency: "ARS", style: "currency" }).format(precio)

const obtenerPrecioFinal = (producto) => {
  const precio = Number(producto.precio || 0)
  const descuento = Number(producto.descuento || 0)
  return descuento > 0 ? precio * (1 - descuento / 100) : precio
}

const tieneDescuentoProducto = (producto) => Number(producto.descuento || 0) > 0

const TarjetaProductoDestacadoHome = ({ producto }) => (
  <CometCard className="h-full" rotateDepth={7} showGlare={false} translateDepth={6}>
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-dorado-primary/45 bg-white p-5 text-green-primary shadow-[0_24px_70px_rgba(20,43,16,0.16)]">
      <div className="rounded-[1.45rem] bg-dorado-primary p-1">
        <div className="aspect-[3/4] overflow-hidden rounded-[1.2rem] bg-[#f7f3e8]">
          <Image
            alt={producto.nombre}
            className="h-full w-full object-cover"
            removeWrapper
            src={obtenerImagenProducto(producto)}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <Chip className="bg-dorado-primary/20 font-black uppercase text-green-primary" size="sm">
          {producto.categoria}
        </Chip>
        {tieneDescuentoProducto(producto) && (
          <Chip className="bg-green-primary text-dorado-primary" size="sm">
            -{producto.descuento}%
          </Chip>
        )}
      </div>

      <h3 className="mt-4 min-h-16 text-xl font-black leading-tight">
        {producto.nombre}
      </h3>
      <div className="mt-4 flex flex-col gap-4">
        <div>
          {tieneDescuentoProducto(producto) ? (
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-black text-green-primary/40 line-through">
                {formatearPesos(producto.precio)}
              </span>
              <span className="text-2xl font-black text-green-primary">
                {formatearPesos(obtenerPrecioFinal(producto))}
              </span>
            </div>
          ) : (
            <p className="text-2xl font-black">{formatearPesos(producto.precio)}</p>
          )}
        </div>

        <HoverBorderGradient className="w-fit">
          <Button
            as={Link}
            className="bg-green-primary px-6 font-black text-dorado-primary"
            radius="full"
            size="sm"
            to={`/productos/${producto.idProducto}`}
          >
            Ver producto
          </Button>
        </HoverBorderGradient>
      </div>
    </article>
  </CometCard>
)

export default TarjetaProductoDestacadoHome
