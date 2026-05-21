import { calcularPrecioFinal, formatearPesos } from '../../../data/reglasProducto'

const PrecioConDescuento = ({ compacto = false, producto }) => {
  const precioOriginal = formatearPesos(producto.precio)
  const precioFinal = formatearPesos(calcularPrecioFinal(producto.precio, producto.descuento))

  if (Number(producto.descuento) <= 0) {
    return <span className="font-black text-[#0b2b88]">{precioOriginal}</span>
  }

  return (
    <div className={`flex ${compacto ? 'items-center gap-2' : 'flex-col gap-1'}`}>
      <span className="text-sm font-bold text-slate-400 line-through">{precioOriginal}</span>
      <span className="font-black text-red-700">{precioFinal}</span>
    </div>
  )
}

export default PrecioConDescuento
