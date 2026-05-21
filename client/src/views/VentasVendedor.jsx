import { useEffect, useState } from 'react'
import PaginaGestion from '../components/layout/PaginaGestion'
import EncabezadoVentas from '../components/vendedor/ventas/EncabezadoVentas'
import MetricasVentas from '../components/vendedor/ventas/MetricasVentas'
import TablaVentas from '../components/vendedor/ventas/TablaVentas'
import { normalizarVentaVendedor, obtenerVentasPagina } from '../data/ventasVendedor'

const VentasVendedor = ({ token, usuario, onCerrarSesion }) => {
  const [ventas, setVentas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let sigueActivo = true

    fetch('/ventas/mias', { headers: { Authorization: `Bearer ${token}` } })
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
    <PaginaGestion usuario={usuario} onCerrarSesion={onCerrarSesion}>
      <EncabezadoVentas />
      <MetricasVentas ventas={ventas} />
      <TablaVentas cargando={cargando} error={error} ventas={ventas} />
    </PaginaGestion>
  )
}

export default VentasVendedor
