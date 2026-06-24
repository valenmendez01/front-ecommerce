import { Button } from "@heroui/react"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { IndicadorActivo } from "./IndicadorActivo"

export const BotonCarritoNav = ({ activo, cantidad }) => (
  <div className="relative z-20 mr-4 flex overflow-visible">
    <Button
      as={Link}
      to="/carrito"
      className="relative flex items-center overflow-visible px-2 py-1 text-white/80 transition-colors duration-300 hover:text-white"
      variant="outline"
      isIconOnly
      aria-label="Carrito"
    >
      <ShoppingCart size={20} />
      <IndicadorActivo activo={activo} className="left-[calc(50%+3px)]" />
    </Button>

    {cantidad > 0 && (
      <span className="pointer-events-none absolute right-1 top-1 z-30 flex h-5 min-w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-dorado-primary px-1 text-[10px] font-black text-black">
        {cantidad > 99 ? "99+" : cantidad}
      </span>
    )}
  </div>
)
