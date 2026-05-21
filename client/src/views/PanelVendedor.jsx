import InformacionPersonal from '../components/cuenta/InformacionPersonal'
import PaginaGestion from '../components/layout/PaginaGestion'
import EncabezadoPanelVendedor from '../components/vendedor/EncabezadoPanelVendedor'
import ProductosPanelVendedor from '../components/vendedor/ProductosPanelVendedor'

const PanelVendedor = ({ token, usuario, onCerrarSesion }) => (
  <PaginaGestion usuario={usuario} onCerrarSesion={onCerrarSesion}>
    <EncabezadoPanelVendedor />
    <div className="mt-10"><InformacionPersonal usuario={usuario} /></div>
    <ProductosPanelVendedor token={token} />
  </PaginaGestion>
)

export default PanelVendedor
