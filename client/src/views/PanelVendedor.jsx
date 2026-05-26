import InformacionPersonal from '../components/cuenta/informacion/InformacionPersonal'
import PaginaGestion from '../components/layout/PaginaGestion'
import EncabezadoPanelVendedor from '../components/vendedor/panel/EncabezadoPanelVendedor'
import ProductosPanelVendedor from '../components/vendedor/panel/ProductosPanelVendedor'

const PanelVendedor = ({ token, usuario, onCerrarSesion }) => (
  <PaginaGestion claseContenido="max-w-[92rem]" usuario={usuario} onCerrarSesion={onCerrarSesion}>
    <EncabezadoPanelVendedor />
    <div className="mt-10"><InformacionPersonal usuario={usuario} /></div>
    <ProductosPanelVendedor token={token} />
  </PaginaGestion>
)

export default PanelVendedor
