import { cn } from "../../../lib/utils"
import { CometCard } from "../../ui/comet-card"
import { AccionDestacado, EtiquetasDestacado, ImagenDestacada, PrecioDestacado } from "./PartesTarjetaProductoDestacadoHome"

const TarjetaProductoDestacadoHome = ({ compacto = false, producto }) => (
  <CometCard className="h-full" rotateDepth={compacto ? 5 : 7} showGlare={false} translateDepth={compacto ? 4 : 6}>
    <article className={cn(
      "flex h-full flex-col overflow-hidden border border-dorado-primary/45 bg-white text-green-primary",
      compacto ? "rounded-[1.15rem] p-3 shadow-[0_18px_44px_rgba(20,43,16,0.13)]" : "rounded-[1.75rem] p-4 shadow-[0_24px_70px_rgba(20,43,16,0.16)]",
    )}>
      <ImagenDestacada compacto={compacto} producto={producto} />
      <EtiquetasDestacado compacto={compacto} producto={producto} />
      <h3 className={cn("font-black leading-tight", compacto ? "mt-2 text-base" : "mt-3 text-lg")}>
        {producto.nombre}
      </h3>
      <div className={cn("flex flex-col gap-2", compacto ? "mt-1.5" : "mt-2")}>
        <PrecioDestacado compacto={compacto} producto={producto} />
        <AccionDestacado compacto={compacto} producto={producto} />
      </div>
    </article>
  </CometCard>
)

export default TarjetaProductoDestacadoHome
