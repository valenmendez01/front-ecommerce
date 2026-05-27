import { formatearPesos } from './reglasCrearProducto'

const VistaPrecioProducto = ({ precio, precioFinal, tieneDescuento }) => (
  <div className="mt-6 rounded-md bg-white p-5">
    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
      Vista previa del precio
    </p>
    {tieneDescuento ? (
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <span className="text-lg font-bold text-slate-400 line-through">{formatearPesos(precio)}</span>
        <span className="text-2xl font-black text-red-700">{formatearPesos(precioFinal)}</span>
      </div>
    ) : (
      <p className="mt-2 text-2xl font-black text-green-primary">{formatearPesos(precio)}</p>
    )}
  </div>
)

export default VistaPrecioProducto
