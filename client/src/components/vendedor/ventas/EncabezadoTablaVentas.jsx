import Tabs from '../../ui/tabs'

const pestanasVentas = [
  { title: 'Ventas recientes', value: 'recientes' },
  { title: 'Historial', value: 'historial' },
]

const EncabezadoTablaVentas = ({ mostrarTodas, onCambiarVista }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6">
    <div>
      <h3 className="text-2xl font-black text-green-primary">
        {mostrarTodas ? 'HISTORIAL DE VENTAS' : 'VENTAS RECIENTES'}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {mostrarTodas ? 'Todas las ventas registradas.' : 'Últimas ventas realizadas.'}
      </p>
    </div>
    <Tabs
      activeTabClassName="shadow-[0_10px_28px_rgba(202,165,110,0.28)]"
      tabClassName="text-green-primary"
      tabs={pestanasVentas}
      value={mostrarTodas ? 'historial' : 'recientes'}
      onChange={onCambiarVista}
    />
  </div>
)

export default EncabezadoTablaVentas
