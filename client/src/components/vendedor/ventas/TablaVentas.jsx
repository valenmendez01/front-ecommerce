import { Card } from '@heroui/react'
import { useState } from 'react'
import EncabezadoTablaVentas from './EncabezadoTablaVentas'
import FilasVentasCargando from './FilasVentasCargando'
import FilaVenta from './FilaVenta'
import ModalDetalleVenta from './ModalDetalleVenta'

const MensajeVentas = ({ children }) => (
  <div className="px-8 py-10 text-center font-semibold text-slate-500">{children}</div>
)

const TablaVentas = ({ cargando, error, ventas }) => {
  const [mostrarTodas, setMostrarTodas] = useState(false)
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null)
  const ventasVisibles = mostrarTodas ? ventas : ventas.slice(0, 3)

  const cambiarVista = (vista) => {
    setMostrarTodas(vista === 'historial')
    setVentaSeleccionada(null)
  }

  return (
    <>
      <Card className="mt-12 overflow-hidden shadow-lg" radius="sm">
        <EncabezadoTablaVentas
          mostrarTodas={mostrarTodas}
          onCambiarVista={cambiarVista}
        />
        {error && (
          <div className="mx-8 mb-6 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        )}
        <div className="border-t border-slate-100">
          {cargando && <FilasVentasCargando />}
          {!cargando && ventasVisibles.length === 0 && (
            <MensajeVentas>Todavia no hay ventas para mostrar.</MensajeVentas>
          )}
          {!cargando && ventasVisibles.map((venta) => (
            <FilaVenta
              key={venta.idVenta}
              venta={venta}
              onVerDetalle={() => setVentaSeleccionada(venta)}
            />
          ))}
        </div>
      </Card>
      <ModalDetalleVenta venta={ventaSeleccionada} onCerrar={() => setVentaSeleccionada(null)} />
    </>
  )
}

export default TablaVentas
