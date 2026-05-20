import { Trash2 } from "lucide-react";
import { formatearPesos } from "../../lib/formatters";

export default function itemCarrito({ articulo, alActualizarCantidad, alEliminar }) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Imagen */}
      <div className="w-20 h-20 rounded-lg bg-gray-900 flex items-center justify-center overflow-hidden shrink-0 relative">
        {articulo.imagen ? (
          <img src={articulo.imagen} alt={articulo.nombre} className="w-full h-full object-cover" />
        ) : (
          <div className="text-yellow-400 text-2xl font-bold">★</div>
        )}
        {articulo.etiqueta && (
          <span className="absolute top-1 left-1 text-[9px] font-bold bg-yellow-400 text-gray-900 px-1 rounded">
            {articulo.etiqueta}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
          {articulo.subtitulo}
        </p>
        <h3 className="font-bold text-gray-900 text-sm leading-tight">{articulo.nombre}</h3>

        <div className="flex items-center gap-3 mt-3">
          {/* Cantidad */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => alActualizarCantidad(articulo.id, articulo.cantidad - 1)}
              className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-sm font-bold"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-semibold border-x border-gray-200">
              {articulo.cantidad}
            </span>
            <button
              onClick={() => alActualizarCantidad(articulo.id, articulo.cantidad + 1)}
              className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-sm font-bold"
            >
              +
            </button>
          </div>

          {/* Eliminar */}
          <button
            onClick={() => alEliminar(articulo.id)}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={13} />
            Eliminar
          </button>
        </div>
      </div>

      {/* Precio */}
      <div className="text-right shrink-0">
        {articulo.precioOriginal && (
          <p className="text-xs text-gray-400 line-through">{formatearPesos(articulo.precioOriginal)}</p>
        )}
        <p className="font-bold text-gray-900">{formatearPesos(articulo.precio * articulo.cantidad)}</p>
        {articulo.badge && (
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
            {articulo.badge}
          </span>
        )}
      </div>
    </div>
  );
}
