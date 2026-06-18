import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EncabezadoCuenta from '../components/cuenta/encabezado/EncabezadoCuenta'
import InformacionPersonal from '../components/cuenta/informacion/InformacionPersonal'
import TablaPedidos from '../components/cuenta/pedidos/tabla/TablaPedidos'
import PaginaPanelUsuario from '../components/panelUsuario/estructura/PaginaPanelUsuario'
import { normalizarPedidoCuenta } from '../components/cuenta/pedidos/datos/datosPedidosCuenta'
import { formatearPesosPedido } from '../components/cuenta/pedidos/datos/formatoPedidosCuenta'
import { fetchPedidosComprador } from '../redux/pedidosSlice'

const obtenerNumeroId = (valor) => Number(valor) || 0

const MiCuenta = ({ token, usuario, onCerrarSesion }) => {
  const dispatch = useDispatch()
  const { pedidos, loading: cargandoPedidos, error: errorPedidos } = useSelector((state) => state.pedidos)

  useEffect(() => {
    dispatch(fetchPedidosComprador({ token, usuarioId: usuario?.idUsuario }))
  }, [dispatch, token, usuario?.idUsuario])

  const pedidosNormalizados = pedidos
    .map(normalizarPedidoCuenta)
    .sort((pedidoA, pedidoB) => obtenerNumeroId(pedidoB.idPedido) - obtenerNumeroId(pedidoA.idPedido))
  const totalGastado = pedidosNormalizados.reduce((total, pedido) => total + pedido.monto, 0)
  const resumen = [
    { titulo: 'Total de pedidos', valor: pedidosNormalizados.length },
    { titulo: 'Gasto total', valor: formatearPesosPedido(totalGastado), destacar: true },
  ]

  return (
    <PaginaPanelUsuario mostrarMenuLateral={false} usuario={usuario} onCerrarSesion={onCerrarSesion}>
      <EncabezadoCuenta resumen={resumen} usuario={usuario} />
      <div className="mt-10">
        <InformacionPersonal usuario={usuario} />
      </div>
      <div className="mt-12">
        <TablaPedidos cargando={cargandoPedidos} error={errorPedidos} pedidos={pedidosNormalizados} />
      </div>
    </PaginaPanelUsuario>
  )
}

export default MiCuenta
