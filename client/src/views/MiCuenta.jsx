import EncabezadoCuenta from '../components/cuenta/EncabezadoCuenta'
import InformacionPersonal from '../components/cuenta/InformacionPersonal'
import TablaPedidos from '../components/cuenta/TablaPedidos'
import PaginaGestion from '../components/layout/PaginaGestion'
import { normalizarPedidoCuenta } from '../data/pedidosCuenta'
import { formatearPesos } from '../data/reglasProducto'

const MiCuenta = ({
  cargandoPedidos = false,
  errorPedidos = '',
  pedidos = [],
  usuario,
  onCerrarSesion,
}) => {
  const pedidosNormalizados = pedidos.map(normalizarPedidoCuenta)
  const totalGastado = pedidosNormalizados.reduce((total, pedido) => total + pedido.monto, 0)
  const resumen = [
    { titulo: 'Total de pedidos', valor: pedidosNormalizados.length },
    { titulo: 'Gasto total', valor: formatearPesos(totalGastado), destacar: true },
  ]

  return (
    <PaginaGestion usuario={usuario} onCerrarSesion={onCerrarSesion}>
      <EncabezadoCuenta resumen={resumen} usuario={usuario} />
      <div className="mt-10">
        <InformacionPersonal usuario={usuario} />
      </div>
      <div className="mt-12">
        <TablaPedidos cargando={cargandoPedidos} error={errorPedidos} pedidos={pedidosNormalizados} />
      </div>
    </PaginaGestion>
  )
}

export default MiCuenta
