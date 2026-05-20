import { Trash2 } from "lucide-react";
import { Button } from "@heroui/react";

import { formatearPesos } from "../../lib/formatters";

export default function itemCarrito({ articulo, alActualizarCantidad, alEliminar }) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="w-20 h-20 rounded-lg bg-gray-900 flex items-center justify-center overflow-hidden shrink-0 relative">
        {articulo.imagen ? (
          <img src={articulo.imagen} alt={articulo.nombre} className="w-full h-full object-cover" />
        ) : (
          <div className="text-yellow-400 text-2xl font-bold">*</div>
        )}
        {articulo.etiqueta && (
          <span className="absolute top-1 left-1 text-[9px] font-bold bg-yellow-400 text-gray-900 px-1 rounded">
            {articulo.etiqueta}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
          {articulo.subtitulo}
        </p>
        <h3 className="font-bold text-gray-900 text-sm leading-tight">{articulo.nombre}</h3>

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              radius="none"
              onPress={() => alActualizarCantidad(articulo.id, articulo.cantidad - 1)}
              className="min-w-8 h-8 text-gray-600 text-sm font-bold"
            >
              -
            </Button>
            <span className="px-3 py-1 text-sm font-semibold border-x border-gray-200">
              {articulo.cantidad}
            </span>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              radius="none"
              onPress={() => alActualizarCantidad(articulo.id, articulo.cantidad + 1)}
              className="min-w-8 h-8 text-gray-600 text-sm font-bold"
            >
              +
            </Button>
          </div>

          <Button
            size="sm"
            variant="light"
            color="danger"
            startContent={<Trash2 size={13} />}
            onPress={() => alEliminar(articulo.id)}
            className="h-8 px-2 text-xs"
          >
            Eliminar
          </Button>
        </div>
      </div>

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
