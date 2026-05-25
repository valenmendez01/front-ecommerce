import { Card } from '@heroui/react'
import { useState } from 'react'
import EncabezadoTablaVentas from './EncabezadoTablaVentas'
import FilaVenta from './FilaVenta'

const MensajeVentas = ({ children }) => (
  <div className="px-8 py-10 text-center font-semibold text-slate-500">{children}</div>
)

const TablaVentas = ({ cargando, error, ventas }) => {
  const [mostrarTodas, setMostrarTodas] = useState(false)
  const [ventaAbierta, setVentaAbierta] = useState(null)
  const ventasVisibles = mostrarTodas ? ventas : ventas.slice(0, 3)

  const cambiarVista = () => {
    setMostrarTodas(!mostrarTodas)
    setVentaAbierta(null)
  }

  return (
    <Card className="mt-12 overflow-hidden shadow-lg" radius="sm">
      <EncabezadoTablaVentas
        mostrarTodas={mostrarTodas}
        onCambiarVista={cambiarVista}
        puedeVerHistorial={ventas.length > 3}
      />
      {error && (
        <div className="mx-8 mb-6 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error}
        </div>
      )}
      <div className="border-t border-slate-100">
        {cargando && <MensajeVentas>Cargando ventas...</MensajeVentas>}
        {!cargando && ventasVisibles.length === 0 && (
          <MensajeVentas>Todavía no hay ventas para mostrar.</MensajeVentas>
        )}
        {!cargando && ventasVisibles.map((venta) => (
          <FilaVenta
            estaAbierta={ventaAbierta === venta.idVenta}
            key={venta.idVenta}
            venta={venta}
            onCambiarDetalle={() =>
              setVentaAbierta(ventaAbierta === venta.idVenta ? null : venta.idVenta)
            }
          />
        ))}
      </div>
    </Card>
  )
}

export default TablaVentas
