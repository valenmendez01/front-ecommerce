import { Button } from '@heroui/react'

const EncabezadoTablaVentas = ({ mostrarTodas, onCambiarVista, puedeVerHistorial }) => (
  <div className="flex items-center justify-between px-8 py-6">
    <div>
      <h3 className="text-2xl font-black text-[#0b2b88]">
        {mostrarTodas ? 'HISTORIAL DE VENTAS' : 'VENTAS RECIENTES'}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {mostrarTodas ? 'Todas las ventas registradas.' : 'Ultimas ventas realizadas.'}
      </p>
    </div>
    {puedeVerHistorial && (
      <Button
        className="bg-transparent text-sm font-bold text-[#0b2b88]"
        radius="sm"
        size="sm"
        onPress={onCambiarVista}
      >
        {mostrarTodas ? 'Ver ventas recientes' : 'Ver todo el historial'}
      </Button>
    )}
  </div>
)

export default EncabezadoTablaVentas
