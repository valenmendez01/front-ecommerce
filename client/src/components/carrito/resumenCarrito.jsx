import { Tag } from "lucide-react";
import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { formatearPesos } from "../../data/reglasProducto";
import { SpotlightCard } from "../ui/spotlight-card";

const PORCENTAJE_PROMO = 20;
const CODIGOS_PROMO = ["PROMO20", "CHAMPIONS2026"];

export default function ResumenCarrito({ subtotal, alProcederAlPago }) {
  const [codigoPromo, setCodigoPromo] = useState("");
  const [promoAplicada, setPromoAplicada] = useState(false);
  const [errorPromo, setErrorPromo] = useState("");

  const descuento = promoAplicada ? Math.round(subtotal * (PORCENTAJE_PROMO / 100)) : 0;
  const total = Math.max(subtotal - descuento, 0);

  const aplicarPromo = () => {
    if (CODIGOS_PROMO.includes(codigoPromo.trim().toUpperCase())) {
      setPromoAplicada(true);
      setErrorPromo("");
    } else {
      setErrorPromo("Codigo invalido");
      setPromoAplicada(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-4"
    >
      <SpotlightCard className="p-6 text-white">
        <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-400 mb-5">
          Resumen del Pedido
        </h2>

        <div className="flex flex-col gap-3 text-sm mb-5">
          <div className="flex justify-between">
            <span className="text-white/80">Subtotal coleccion</span>
            <span className="font-semibold">{formatearPesos(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">Envio estandar</span>
            <span className="font-bold text-yellow-400">GRATIS</span>
          </div>
          {promoAplicada && (
            <div className="flex justify-between text-yellow-400">
              <span>Descuento PROMO20</span>
              <span>-{PORCENTAJE_PROMO}% ({formatearPesos(descuento)})</span>
            </div>
          )}
        </div>

        <div className="border-t border-yellow-400/30 pt-4 flex justify-between items-center mb-6">
          <span className="font-bold text-base">Total a pagar</span>
          <span className="text-yellow-400 font-black text-xl">
            {formatearPesos(total)}
          </span>
        </div>

        <Button
          onPress={alProcederAlPago}
          className="w-full bg-yellow-400 text-black font-black text-sm uppercase tracking-wider rounded-xl"
        >
          Proceder al Pago
        </Button>

      </SpotlightCard>

      <div className="bg-green-primary rounded-2xl p-5 border border-dorado-primary/25 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-3 flex items-center gap-2">
          <Tag size={13} /> Codigo Promocional
        </p>
        <div className="flex gap-2">
          <Input
            value={codigoPromo}
            onValueChange={setCodigoPromo}
            placeholder="Ej. CHAMPIONS2026"
            variant="bordered"
            radius="sm"
            classNames={{ input: "uppercase text-white placeholder:text-white/45" }}
            className="flex-1"
          />
          <Button
            onPress={aplicarPromo}
            className="bg-yellow-400 text-black font-bold rounded-lg px-4 text-sm shrink-0"
          >
            Aplicar
          </Button>
        </div>
        {errorPromo && <p className="text-xs text-red-500 mt-1">{errorPromo}</p>}
        {promoAplicada && <p className="text-xs text-yellow-400 mt-1">Codigo aplicado</p>}
      </div>
    </motion.div>
  );
}
