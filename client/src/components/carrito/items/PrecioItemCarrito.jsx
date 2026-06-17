import { formatearPesos } from "../../../lib/reglasProducto";

export default function PrecioItemCarrito({ articulo }) {
  const precioOriginalTotal = articulo.precioOriginal ? articulo.precioOriginal * articulo.cantidad : 0;
  const precioFinalTotal = articulo.precio * articulo.cantidad;

  return (
    <div className="text-right shrink-0">
      {articulo.precioOriginal && (
        <p className="text-xs text-white/50 line-through">{formatearPesos(precioOriginalTotal)}</p>
      )}
      <p className="font-bold text-white">{formatearPesos(precioFinalTotal)}</p>
      {articulo.descuento > 0 && (
        <span className="text-[10px] font-bold text-black bg-dorado-primary px-1.5 py-0.5 rounded">
          -{articulo.descuento}%
        </span>
      )}
      {articulo.badge && !articulo.descuento && (
        <span className="text-[10px] font-bold text-black bg-dorado-primary px-1.5 py-0.5 rounded">
          {articulo.badge}
        </span>
      )}
    </div>
  );
}
