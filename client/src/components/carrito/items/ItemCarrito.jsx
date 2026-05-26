import { Trash2 } from "lucide-react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

import { formatearPesos } from "../../../data/reglasProducto";
import ImagenProducto from "./ImagenProducto";

export default function ItemCarrito({ articulo, alActualizarCantidad, alEliminar }) {
  const sinMasStock = articulo.stock && articulo.cantidad >= articulo.stock;
  const precioOriginalTotal = articulo.precioOriginal ? articulo.precioOriginal * articulo.cantidad : 0;
  const precioFinalTotal = articulo.precio * articulo.cantidad;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 p-4 bg-green-primary rounded-xl border border-dorado-primary/25 shadow-sm"
    >
      <div className="shrink-0 relative">
        <ImagenProducto
          src={articulo.imagen}
          alt={articulo.nombre}
          className="w-20 h-28 rounded-lg"
        />
        {articulo.etiqueta && (
          <span className="absolute top-1 left-1 text-[9px] font-bold bg-dorado-primary text-black px-1 rounded">
            {articulo.etiqueta}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-dorado-primary uppercase tracking-wider mb-0.5">
          {articulo.subtitulo}
        </p>
        <h3 className="font-bold text-white text-sm leading-tight">{articulo.nombre}</h3>
        {articulo.stock && (
          <p className="text-[10px] font-semibold text-white/70 mt-0.5">
            Stock disponible: {articulo.stock}
          </p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-dorado-primary/50 rounded-lg overflow-hidden bg-white">
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
            <span className="px-3 py-1 text-sm font-semibold text-black border-x border-dorado-primary/40">
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
            className="h-8 px-2 text-xs text-dorado-primary"
          >
            Eliminar
          </Button>
        </div>
      </div>

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
    </motion.div>
  );
}
