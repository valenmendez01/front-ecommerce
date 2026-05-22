import { CircleUserRound, ShoppingCart } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logoHorizontal.png'

const enlacesCliente = [
  { texto: 'Home', ruta: '/' },
  { texto: 'Catálogo', ruta: '/productos' },
]

const claseEnlace = ({ isActive }) =>
  `border-b-4 px-1 py-5 transition ${
    isActive ? 'border-[#caa56e] text-[#142b10]' : 'border-transparent text-[#5f6d5a]'
  }`

const BarraSuperior = ({ usuario }) => {
  const esVendedor = usuario?.rol === 'VENDEDOR'
  const rutaCuenta = esVendedor ? '/panel-vendedor' : '/mi-cuenta'

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#d8c49a] bg-[#fffdf8] px-8 shadow-sm">
      <Link className="flex items-center transition hover:opacity-90" to="/">
        <img className="h-11 w-auto" src={logo} alt="Figullect" />
      </Link>

      <nav className="hidden items-center gap-10 text-base font-semibold text-slate-500 md:flex">
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

      <div className="flex items-center gap-4 text-[#142b10]">
        {!esVendedor && (
          <Link
            aria-label="Carrito"
            className="flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-[#142b10]/5"
            to="/carrito"
          >
            <ShoppingCart size={26} strokeWidth={2.5} />
          </Link>
        )}
        <NavLink
          aria-label="Mi cuenta"
          className={({ isActive }) =>
            `flex h-12 w-10 items-center justify-center border-b-4 transition hover:bg-[#142b10]/5 ${
              isActive ? 'border-[#caa56e]' : 'border-transparent'
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
