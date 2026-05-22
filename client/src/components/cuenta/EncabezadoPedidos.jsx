import { Button } from '@heroui/react'

const EncabezadoPedidos = ({ mostrarHistorial, onCambiarVista, puedeVerHistorial }) => (
  <div className="flex items-center justify-between px-8 py-6">
    <div>
      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8d6f3e]">Compras</p>
      <h2 className="mt-1 text-2xl font-black text-[#142b10]">
        {mostrarHistorial ? 'HISTORIAL DE PEDIDOS' : 'PEDIDOS RECIENTES'}
      </h2>
      {mostrarHistorial && (
        <p className="mt-1 text-sm text-[#5f6d5a]">Mostrando todos los pedidos registrados.</p>
      )}
    </div>

    {puedeVerHistorial && (
      <Button
        className="border border-[#d8c49a] bg-white text-sm font-bold text-[#142b10]"
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
