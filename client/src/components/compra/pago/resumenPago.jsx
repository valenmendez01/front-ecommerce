import { Button } from "@heroui/react";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { formatearPesos } from "../../../data/reglasProducto";
import { SpotlightCard } from "../../ui/spotlight-card";

export default function ResumenPago({ alConfirmar, puedeConfirmar, cargando, resumen }) {
  const tieneDescuento = resumen.descuento > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-4"
    >
      <SpotlightCard className="p-6 text-white">
        <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-yellow-400">
          Ticket de compra
        </h2>

        <div className="mb-5 flex flex-col gap-2 border-y border-dashed border-yellow-400/35 py-4 text-sm">
          <FilaTicket etiqueta="Subtotal" valor={formatearPesos(resumen.subtotalOriginal)} />
          {tieneDescuento && (
            <FilaTicket etiqueta="Descuentos" valor={`-${formatearPesos(resumen.descuento)}`} destacado />
          )}
          <FilaTicket etiqueta="Envío" valor="GRATIS" destacado />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <span className="font-black uppercase tracking-wide">Total</span>
          <span className="text-xl font-black text-yellow-400">{formatearPesos(resumen.total)}</span>
        </div>

        <Button
          onPress={alConfirmar}
          isDisabled={!puedeConfirmar || cargando}
          startContent={!cargando && <Rocket size={16} />}
          className={`w-full rounded-xl text-sm font-black uppercase tracking-wider ${
            puedeConfirmar && !cargando
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-white/10 text-white/40"
          }`}
        >
          {cargando ? "Confirmando..." : puedeConfirmar ? "Confirmar pedido" : "Completá los datos"}
        </Button>

        {!puedeConfirmar && (
          <p className="mt-2 text-center text-xs text-white/60">
            Completá envío y pago para continuar
          </p>
        )}
      </SpotlightCard>
    </motion.div>
  );
}

function FilaTicket({ destacado = false, etiqueta, valor }) {
  return (
    <div className={`flex justify-between ${destacado ? "text-yellow-400" : "text-white/80"}`}>
      <span>{etiqueta}</span>
      <span className="font-semibold">{valor}</span>
    </div>
  );
}
