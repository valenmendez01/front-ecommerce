import { Rocket } from "lucide-react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { formatearPesos } from "../../data/reglasProducto";
import { SpotlightCard } from "../ui/spotlight-card";

export default function ResumenPago({ articulos, alConfirmar, puedeConfirmar, cargando }) {
  const subtotal = articulos.reduce((acc, a) => acc + a.precio * a.cantidad, 0);
  const envio = 0;
  const impuesto = 0;
  const total = subtotal + envio + impuesto;

  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-4"
    >
      <SpotlightCard className="text-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-400 mb-5">
          Resumen del Pedido
        </h2>

        <div className="flex flex-col gap-3 text-sm mb-5">
          <div className="flex justify-between">
            <span className="text-white/80">Subtotal</span>
            <span className="font-semibold">{formatearPesos(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">Envio</span>
            <span className="font-bold text-yellow-400">GRATIS</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">Impuesto estimado</span>
            <span className="font-semibold">{formatearPesos(impuesto)}</span>
          </div>
        </div>

        <div className="border-t border-yellow-400/30 pt-4 flex justify-between items-center mb-5">
          <span className="font-bold">Total</span>
          <span className="text-yellow-400 font-black text-xl">{formatearPesos(total)}</span>
        </div>

        <Button
          onPress={alConfirmar}
          isDisabled={!puedeConfirmar || cargando}
          startContent={!cargando && <Rocket size={16} />}
          className={`w-full rounded-xl font-black text-sm uppercase tracking-wider ${
            puedeConfirmar && !cargando
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-white/10 text-white/40"
          }`}
        >
          {cargando ? "Confirmando..." : puedeConfirmar ? "Confirmar Pedido" : "Completa los datos"}
        </Button>

        {!puedeConfirmar && (
          <p className="text-xs text-white/60 text-center mt-2">
            Completa envio y pago para continuar
          </p>
        )}
      </SpotlightCard>
    </motion.div>
  );
}
