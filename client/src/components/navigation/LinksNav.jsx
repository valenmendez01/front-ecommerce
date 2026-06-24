import { Link } from "react-router-dom"
import { IndicadorActivo } from "./IndicadorActivo"

export const LinksNav = ({ items, pathname }) => (
  <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium lg:flex">
    {items.map((item) => {
      const activo = pathname === item.link || pathname.startsWith(`${item.link}/`)

      return (
        <Link
          key={item.link}
          to={item.link}
          className="relative px-4 py-2 text-white/80 transition-colors duration-200 hover:text-white"
        >
          <span className={activo ? "font-semibold text-white" : ""}>{item.name}</span>
          <IndicadorActivo activo={activo} className="left-1/2" />
        </Link>
      )
    })}
  </div>
)
