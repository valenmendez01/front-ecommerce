import { Button } from '@heroui/react'

const EncabezadoPedidos = ({ mostrarHistorial, onCambiarVista, puedeVerHistorial }) => (
  <div className="flex items-center justify-between px-8 py-6">
    <div>
      <h2 className="text-2xl font-black text-[#0b2b88]">
        {mostrarHistorial ? 'HISTORIAL DE PEDIDOS' : 'PEDIDOS RECIENTES'}
      </h2>
      {mostrarHistorial && (
        <p className="mt-1 text-sm text-slate-500">Mostrando todos los pedidos registrados.</p>
      )}
    </div>

    {puedeVerHistorial && (
      <Button
        className="bg-transparent text-sm font-bold text-[#0b2b88]"
        radius="sm"
        size="sm"
        onPress={onCambiarVista}
      >
        {mostrarHistorial ? 'Ver pedidos recientes' : 'Ver todo el historial'}
      </Button>
    )}
  </div>
)

export default EncabezadoPedidos
