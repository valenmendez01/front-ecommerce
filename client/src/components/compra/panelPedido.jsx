import { formatearPesos } from "../../data/reglasProducto";
import ImagenProducto from "../carrito/imagenProducto";
import { motion } from "framer-motion";

export default function PanelPedido({ articulos }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-green-primary rounded-2xl border border-dorado-primary/25 shadow-sm overflow-hidden"
    >
      <div className="p-4 border-b border-yellow-400/30">
        <h3 className="font-bold text-white">Tu selección</h3>
        <p className="text-xs text-white/60">{articulos.length} producto(s)</p>
      </div>

      <div className="divide-y divide-yellow-400/20">
        {articulos.map((articulo) => (
          <motion.div
            key={articulo.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4"
          >
            {(() => {
              const precioOriginalTotal = articulo.precioOriginal ? articulo.precioOriginal * articulo.cantidad : 0;
              const precioFinalTotal = articulo.precio * articulo.cantidad;

              return (
                <>
            <ImagenProducto
              src={articulo.imagen}
              alt={articulo.nombre}
              className="w-20 h-28 rounded-xl shrink-0"
            />

            <div className="flex-1 min-w-0">
              {articulo.etiqueta && (
                <span className="text-[9px] font-bold bg-yellow-400 text-black px-1.5 py-0.5 rounded mr-1">
                  {articulo.etiqueta}
                </span>
              )}
              <p className="text-sm font-semibold text-white truncate">{articulo.nombre}</p>
              <p className="text-xs text-yellow-400">{articulo.subtitulo}</p>
              {articulo.descuento > 0 && (
                <p className="mt-1 text-[10px] font-black text-yellow-400">-{articulo.descuento}% aplicado</p>
              )}
            </div>

            <span className="text-xs font-bold text-black bg-white px-3 py-1 rounded-lg">
              x{articulo.cantidad}
            </span>

            <div className="w-20 text-right">
              {articulo.precioOriginal && (
                <p className="text-[10px] text-white/45 line-through">
                  {formatearPesos(precioOriginalTotal)}
                </p>
              )}
              <p className="text-sm font-bold text-white">{formatearPesos(precioFinalTotal)}</p>
            </div>
                </>
              );
            })()}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
