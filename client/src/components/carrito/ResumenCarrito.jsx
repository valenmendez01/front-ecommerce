import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { formatearPesos } from "../../lib/reglasProducto";
import { SpotlightCard } from "../ui/spotlight-card";

export default function ResumenCarrito({ resumen, alProcederAlPago }) {
  const tieneDescuento = resumen.descuento > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
    >
      <SpotlightCard className="p-6 text-white">
        <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-dorado-primary">
          Resumen del pedido
        </h2>

        <div className="mb-5 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-white/80">Subtotal</span>
            <span className="font-semibold">{formatearPesos(resumen.subtotalOriginal)}</span>
          </div>
          {tieneDescuento && (
            <div className="flex justify-between text-dorado-primary">
              <span>Descuentos</span>
              <span>-{formatearPesos(resumen.descuento)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-white/80">Envío estándar</span>
            <span className="font-bold text-dorado-primary">GRATIS</span>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between border-t border-dorado-primary/30 pt-4">
          <span className="text-base font-bold">Total a pagar</span>
          <span className="text-xl font-black text-dorado-primary">{formatearPesos(resumen.total)}</span>
        </div>

        <Button
          onPress={alProcederAlPago}
          className="w-full rounded-xl bg-dorado-primary text-sm font-black uppercase tracking-wider text-black"
        >
          Proceder al pago
        </Button>
      </SpotlightCard>
    </motion.div>
  );
}
