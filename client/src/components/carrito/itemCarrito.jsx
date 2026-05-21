import { Trash2 } from "lucide-react";
import { Button } from "@heroui/react";

import { formatearPesos } from "../../data/reglasProducto";

export default function itemCarrito({ articulo, alActualizarCantidad, alEliminar }) {
  const sinMasStock = articulo.stock && articulo.cantidad >= articulo.stock;

  return (
    <div className="flex gap-4 p-4 bg-emerald-950 rounded-xl border border-emerald-900 shadow-sm">
      <div className="w-20 h-20 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0 relative">
        {articulo.imagen ? (
          <img src={articulo.imagen} alt={articulo.nombre} className="w-full h-full object-cover" />
        ) : (
          <div className="text-yellow-500 text-2xl font-bold">*</div>
        )}
        {articulo.etiqueta && (
          <span className="absolute top-1 left-1 text-[9px] font-bold bg-yellow-400 text-black px-1 rounded">
            {articulo.etiqueta}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-0.5">
          {articulo.subtitulo}
        </p>
        <h3 className="font-bold text-white text-sm leading-tight">{articulo.nombre}</h3>
        {articulo.stock && (
          <p className="text-[10px] font-semibold text-white/70 mt-0.5">
            Stock disponible: {articulo.stock}
          </p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-yellow-400/50 rounded-lg overflow-hidden bg-white">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              radius="none"
              onPress={() => alActualizarCantidad(articulo.id, articulo.cantidad - 1)}
              className="min-w-8 h-8 text-black text-sm font-bold"
            >
              -
            </Button>
            <span className="px-3 py-1 text-sm font-semibold text-black border-x border-yellow-400/40">
              {articulo.cantidad}
            </span>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              radius="none"
              isDisabled={sinMasStock}
              onPress={() => alActualizarCantidad(articulo.id, articulo.cantidad + 1)}
              className="min-w-8 h-8 text-black text-sm font-bold"
            >
              +
            </Button>
          </div>

          <Button
            size="sm"
            variant="light"
            color="warning"
            startContent={<Trash2 size={13} />}
            onPress={() => alEliminar(articulo.id)}
            className="h-8 px-2 text-xs text-yellow-300"
          >
            Eliminar
          </Button>
        </div>
      </div>

      <div className="text-right shrink-0">
        {articulo.precioOriginal && (
          <p className="text-xs text-white/50 line-through">{formatearPesos(articulo.precioOriginal)}</p>
        )}
        <p className="font-bold text-white">{formatearPesos(articulo.precio * articulo.cantidad)}</p>
        {articulo.badge && (
          <span className="text-[10px] font-bold text-black bg-yellow-400 px-1.5 py-0.5 rounded">
            {articulo.badge}
          </span>
        )}
      </div>
    </div>
  );
}
