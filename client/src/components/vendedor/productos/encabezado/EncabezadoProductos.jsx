import { Button } from '@heroui/react'

const EncabezadoProductos = ({ mostrarTodos, onCambiarVista, puedeVerTodos }) => (
  <div className="flex items-center justify-between px-8 py-7">
    <div>
      <h2 className="text-2xl font-black text-green-primary">PRODUCTOS PUBLICADOS</h2>
      <p className="mt-1 text-sm text-slate-500">Productos cargados desde tu cuenta vendedora.</p>
    </div>
    {puedeVerTodos && (
      <Button
        className="bg-transparent text-sm font-bold text-green-primary"
        radius="sm"
        size="sm"
        onPress={onCambiarVista}
      >
        {mostrarTodos ? 'Ver menos productos' : 'Ver todos los productos'}
      </Button>
    )}
  </div>
)

export default EncabezadoProductos
