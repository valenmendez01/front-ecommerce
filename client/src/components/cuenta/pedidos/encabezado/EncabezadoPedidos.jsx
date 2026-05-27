import Tabs from '../../../ui/tabs'

const pestanasPedidos = [
  { title: 'Pedidos recientes', value: 'recientes' },
  { title: 'Historial', value: 'historial' },
]

const EncabezadoPedidos = ({ mostrarHistorial, onCambiarVista }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6">
    <div>
      <h2 className="text-2xl font-black text-green-primary">
        {mostrarHistorial ? 'HISTORIAL DE PEDIDOS' : 'PEDIDOS RECIENTES'}
      </h2>
      {mostrarHistorial && (
        <p className="mt-1 text-sm text-slate-500">Mostrando todos los pedidos registrados.</p>
      )}
    </div>

    <Tabs
      activeTabClassName="shadow-[0_10px_28px_rgba(202,165,110,0.28)]"
      tabClassName="text-green-primary"
      tabs={pestanasPedidos}
      value={mostrarHistorial ? 'historial' : 'recientes'}
      onChange={onCambiarVista}
    />
  </div>
)

export default EncabezadoPedidos
