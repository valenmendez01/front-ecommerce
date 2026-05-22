import {
  CircleUserRound,
  Grid2X2,
  LogOut,
  PlusSquare,
  ShoppingCart,
  WalletCards,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const opcionesCliente = [
  { texto: 'Mi cuenta', ruta: '/mi-cuenta', Icono: CircleUserRound },
  { texto: 'Mi carrito', ruta: '/carrito', Icono: ShoppingCart },
  { texto: 'Catálogo', ruta: '/productos', Icono: Grid2X2 },
]

const opcionesVendedor = [
  { texto: 'Panel vendedor', ruta: '/panel-vendedor', Icono: Grid2X2 },
  { texto: 'Crear producto', ruta: '/crear-producto', Icono: PlusSquare },
  { texto: 'Ventas', ruta: '/ventas', Icono: WalletCards },
]

const MenuLateral = ({ usuario, onCerrarSesion }) => {
  const rolCuenta = usuario.rol === 'VENDEDOR' ? 'vendedor' : 'cliente'
  const iniciales = `${usuario.nombre?.[0] || ''}${usuario.apellido?.[0] || ''}`.toUpperCase()
  const esVendedor = usuario.rol === 'VENDEDOR'
  const opciones = esVendedor ? opcionesVendedor : opcionesCliente

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-[#d8c49a] bg-[#fffdf8]">
      <div className="border-b border-[#d8c49a] px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#caa56e] bg-[#142b10] text-sm font-black text-white">
            {iniciales}
          </div>
          <div>
            <p className="font-bold text-[#142b10]">
              {usuario.nombre} {usuario.apellido}
            </p>
            <p className="text-sm text-[#5f6d5a]">Cuenta de {rolCuenta}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-3">
          {opciones.map(({ texto, ruta, Icono }) => (
            <li key={texto}>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-md px-5 py-3 text-lg font-medium ${
                    isActive
                      ? 'bg-[#142b10] text-white shadow-md shadow-[#142b10]/15'
                      : 'text-[#5f6d5a] hover:bg-[#142b10]/5 hover:text-[#142b10]'
                  }`
                }
                end={texto === 'Catálogo'}
                to={ruta}
              >
                <Icono size={24} strokeWidth={2.2} />
                {texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-[#d8c49a] px-5 py-6">
        <button
          className="flex items-center gap-4 text-lg font-medium text-red-700 transition hover:text-red-800"
          type="button"
          onClick={onCerrarSesion}
        >
          <LogOut size={24} strokeWidth={2.2} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

export default MenuLateral
