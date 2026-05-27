import InformacionPersonal from '../components/cuenta/informacion/InformacionPersonal'
import PaginaPanelUsuario from '../components/panelUsuario/PaginaPanelUsuario'
import EncabezadoPanelVendedor from '../components/vendedor/panel/EncabezadoPanelVendedor'
import ProductosPanelVendedor from '../components/vendedor/panel/ProductosPanelVendedor'

const PanelVendedor = ({ token, usuario, onCerrarSesion }) => (
  <PaginaPanelUsuario claseContenido="max-w-[92rem]" usuario={usuario} onCerrarSesion={onCerrarSesion}>
    <EncabezadoPanelVendedor />
    <div className="mt-10"><InformacionPersonal usuario={usuario} /></div>
    <ProductosPanelVendedor token={token} />
  </PaginaPanelUsuario>
)

export default PanelVendedor
