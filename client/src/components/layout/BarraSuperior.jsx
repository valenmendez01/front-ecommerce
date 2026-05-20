import { CircleUserRound, ShoppingCart } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const enlaces = [
  { texto: 'Catálogo', ruta: '/productos', principal: true },
  { texto: 'Figuritas', ruta: '/productos' },
  { texto: 'Álbumes', ruta: '/productos' },
  { texto: 'Combos', ruta: '/productos' },
  { texto: 'Marketplace', ruta: '/productos' },
]

const claseEnlace = ({ isActive }) =>
  `border-b-4 px-1 py-5 transition ${
    isActive ? 'border-[#0b2b88] text-[#0b2b88]' : 'border-transparent text-slate-500'
  }`

const BarraSuperior = ({ esVendedor = false }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-[#0b2b88] bg-white px-8">
      <Link className="text-2xl font-black italic text-[#0b2b88]" to="/">
        FIGULLECT
      </Link>

      {!esVendedor && (
        <nav className="hidden items-center gap-10 text-base font-semibold text-slate-500 md:flex">
          {enlaces.map((enlace) => (
            <NavLink
              className={({ isActive }) =>
                claseEnlace({ isActive: enlace.principal && isActive })
              }
              end={enlace.ruta === '/productos'}
              key={enlace.texto}
              to={enlace.ruta}
            >
              {enlace.texto}
            </NavLink>
          ))}
        </nav>
      )}

      <div className="flex items-center gap-4 text-[#0b2b88]">
        {!esVendedor && (
          <Link
            aria-label="Carrito"
            className="flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-blue-50"
            to="/carrito"
          >
            <ShoppingCart size={26} strokeWidth={2.5} />
          </Link>
        )}
        <NavLink
          aria-label={esVendedor ? 'Panel vendedor' : 'Mi cuenta'}
          className={({ isActive }) =>
            `flex h-12 w-10 items-center justify-center border-b-4 transition hover:bg-blue-50 ${
              isActive ? 'border-[#0b2b88]' : 'border-transparent'
            }`
          }
          to={esVendedor ? '/panel-vendedor' : '/mi-cuenta'}
        >
          <CircleUserRound size={28} strokeWidth={2.5} />
        </NavLink>
      </div>
    </header>
  )
}

export default BarraSuperior
