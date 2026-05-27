import { Trash2 } from "lucide-react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

import ControlesCantidad from "./ControlesCantidad";
import ImagenProducto from "./ImagenProducto";
import PrecioItemCarrito from "./PrecioItemCarrito";

export default function ItemCarrito({ articulo, alActualizarCantidad, alEliminar }) {
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
          <ControlesCantidad
            cantidad={articulo.cantidad}
            stock={articulo.stock}
            alRestar={() => alActualizarCantidad(articulo.id, articulo.cantidad - 1)}
            alSumar={() => alActualizarCantidad(articulo.id, articulo.cantidad + 1)}
          />

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

      <PrecioItemCarrito articulo={articulo} />
    </motion.div>
  );
}
