import PaginaGestion from '../components/layout/PaginaGestion'
import EncabezadoVentas from '../components/vendedor/ventas/EncabezadoVentas'
import MetricasVentas from '../components/vendedor/ventas/MetricasVentas'
import TablaVentas from '../components/vendedor/ventas/TablaVentas'

const VentasVendedor = ({
  cargandoVentas = false,
  errorVentas = '',
  usuario,
  ventas = [],
  onCerrarSesion,
}) => (
  <PaginaGestion usuario={usuario} onCerrarSesion={onCerrarSesion}>
    <EncabezadoVentas />
    <MetricasVentas ventas={ventas} />
    <TablaVentas cargando={cargandoVentas} error={errorVentas} ventas={ventas} />
  </PaginaGestion>
)

export default VentasVendedor
