import { CircleUserRound, ShoppingCart } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const enlacesCliente = [
  { texto: 'Home', ruta: '/' },
  { texto: 'Catálogo', ruta: '/productos' },
]

const claseEnlace = ({ isActive }) =>
  `border-b-4 px-1 py-5 transition ${
    isActive ? 'border-dorado-primary text-green-primary' : 'border-transparent text-green-primary/70'
  }`

const BarraSuperior = ({ usuario }) => {
  const esVendedor = usuario?.rol === 'VENDEDOR'
  const rutaCuenta = esVendedor ? '/panel-vendedor' : '/mi-cuenta'

  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-dorado-primary bg-white px-8">
      <Link className="text-2xl font-black italic text-green-primary" to="/">
        FIGULLECT
      </Link>

      <nav className="hidden items-center gap-10 text-base font-semibold md:flex">
        {!esVendedor && enlacesCliente.map((enlace) => (
          <NavLink
            className={claseEnlace}
            end={enlace.ruta === '/'}
            key={enlace.texto}
            to={enlace.ruta}
          >
            {enlace.texto}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-4 text-green-primary">
        {!esVendedor && (
          <Link
            aria-label="Carrito"
            className="flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-dorado-primary/20"
            to="/carrito"
          >
            <ShoppingCart size={26} strokeWidth={2.5} />
          </Link>
        )}
        <NavLink
          aria-label="Mi cuenta"
          className={({ isActive }) =>
            `flex h-12 w-10 items-center justify-center border-b-4 transition hover:bg-dorado-primary/20 ${
              isActive ? 'border-dorado-primary' : 'border-transparent'
            }`
          }
          to={rutaCuenta}
        >
          <CircleUserRound size={28} strokeWidth={2.5} />
        </NavLink>
      </div>
    </header>
  )
}

export default BarraSuperior
