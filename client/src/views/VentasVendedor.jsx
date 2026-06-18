import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaginaPanelUsuario from '../components/panelUsuario/estructura/PaginaPanelUsuario'
import EncabezadoVentas from '../components/vendedor/ventas/encabezado/EncabezadoVentas'
import MetricasVentas from '../components/vendedor/ventas/metricas/MetricasVentas'
import TablaVentas from '../components/vendedor/ventas/tabla/TablaVentas'
import { normalizarVentaVendedor, obtenerVentasPagina } from '../components/vendedor/ventas/datos/datosVentasVendedor'
import { fetchVentasVendedor } from '../redux/ventasSlice'

const obtenerNumeroId = (valor) => Number(valor) || 0

const VentasVendedor = ({ token, usuario, onCerrarSesion }) => {
  const dispatch = useDispatch()
  const { ventas: ventasOriginales, loading: cargando, error } = useSelector((state) => state.ventas)

  useEffect(() => {
    dispatch(fetchVentasVendedor({ token, usuarioId: usuario?.idUsuario }))
  }, [dispatch, token, usuario?.idUsuario])

  const ventas = obtenerVentasPagina(ventasOriginales)
    .map(normalizarVentaVendedor)
    .sort((ventaA, ventaB) => obtenerNumeroId(ventaB.idVenta) - obtenerNumeroId(ventaA.idVenta))

  return (
    <PaginaPanelUsuario usuario={usuario} onCerrarSesion={onCerrarSesion}>
      <EncabezadoVentas />
      <MetricasVentas ventas={ventas} />
      <TablaVentas cargando={cargando} error={error} ventas={ventas} />
    </PaginaPanelUsuario>
  )
}

export default VentasVendedor
