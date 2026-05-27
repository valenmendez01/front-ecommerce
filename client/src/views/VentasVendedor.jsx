import { useEffect, useState } from 'react'
import PaginaPanelUsuario from '../components/panelUsuario/estructura/PaginaPanelUsuario'
import EncabezadoVentas from '../components/vendedor/ventas/encabezado/EncabezadoVentas'
import MetricasVentas from '../components/vendedor/ventas/metricas/MetricasVentas'
import TablaVentas from '../components/vendedor/ventas/tabla/TablaVentas'
import { normalizarVentaVendedor, obtenerVentasPagina } from '../components/vendedor/ventas/datos/datosVentasVendedor'

const VentasVendedor = ({ token, usuario, onCerrarSesion }) => {
  const [ventas, setVentas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let sigueActivo = true

    fetch('/ventas/vendedor', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (respuesta) => {
        const json = await respuesta.json()
        if (!respuesta.ok) throw new Error(json.mensaje || json.message || 'No se pudieron cargar tus ventas.')
        if (sigueActivo) setVentas(obtenerVentasPagina(json.data).map(normalizarVentaVendedor))
      })
      .catch((fallo) => sigueActivo && setError(fallo.message))
      .finally(() => sigueActivo && setCargando(false))

    return () => { sigueActivo = false }
  }, [token])

  return (
    <PaginaPanelUsuario usuario={usuario} onCerrarSesion={onCerrarSesion}>
      <EncabezadoVentas />
      <MetricasVentas ventas={ventas} />
      <TablaVentas cargando={cargando} error={error} ventas={ventas} />
    </PaginaPanelUsuario>
  )
}

export default VentasVendedor
