import { useLocation } from 'react-router-dom'
import { Sidebar, SidebarBody, SidebarLink } from '../../ui/sidebar'
import PerfilMenuVendedor from '../perfil/PerfilMenuVendedor'
import { opcionesVendedor } from './opcionesMenuPanelUsuario'

const MenuLateralVendedor = ({ iniciales, usuario }) => {
  const location = useLocation()

  return (
    <Sidebar className="min-h-[calc(100vh-56px)]">
      <SidebarBody>
        <PerfilMenuVendedor iniciales={iniciales} usuario={usuario} />
        <nav className="flex flex-1 flex-col gap-3">
          {opcionesVendedor.map(({ texto, ruta, Icono }) => (
            <SidebarLink
              active={location.pathname === ruta}
              icon={Icono}
              key={texto}
              to={ruta}
            >
              {texto}
            </SidebarLink>
          ))}
        </nav>
      </SidebarBody>
    </Sidebar>
  )
}

export default MenuLateralVendedor
