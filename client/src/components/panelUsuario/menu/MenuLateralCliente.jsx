import { NavLink } from 'react-router-dom'
import PerfilMenuCliente from '../perfil/PerfilMenuCliente'
import { opcionesCliente } from './opcionesMenuPanelUsuario'

const MenuLateralCliente = ({ iniciales, rolCuenta, usuario }) => (
  <aside className="flex w-64 shrink-0 flex-col border-r border-dorado-primary/35 bg-white">
    <PerfilMenuCliente iniciales={iniciales} rolCuenta={rolCuenta} usuario={usuario} />
    <nav className="flex-1 px-4 py-6">
      <ul className="space-y-3">
        {opcionesCliente.map(({ texto, ruta, Icono }) => (
          <li key={texto}>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-md px-5 py-3 text-lg font-medium ${
                  isActive
                    ? 'bg-green-primary text-white shadow-md ring-1 ring-dorado-primary/70'
                    : 'text-green-primary hover:bg-dorado-primary/15'
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
  </aside>
)

export default MenuLateralCliente
