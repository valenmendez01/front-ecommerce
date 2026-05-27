import { calcularPrecioFinalProducto, formatearPesosProducto } from './reglasProductoVendedor'

const PrecioConDescuento = ({ compacto = false, producto }) => {
  const precioOriginal = formatearPesosProducto(producto.precio)
  const precioFinal = formatearPesosProducto(calcularPrecioFinalProducto(producto.precio, producto.descuento))

  if (Number(producto.descuento) <= 0) {
    return <span className="font-black text-green-primary">{precioOriginal}</span>
  }

  return (
    <div className={`flex ${compacto ? 'items-center gap-2' : 'flex-col gap-1'}`}>
      <span className="text-sm font-bold text-slate-400 line-through">{precioOriginal}</span>
      <span className="font-black text-red-700">{precioFinal}</span>
    </div>
  )
}

export default PrecioConDescuento
