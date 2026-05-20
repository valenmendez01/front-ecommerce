import { ShieldCheck, BadgeCheck, Tag } from "lucide-react";
import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { formatearPesos } from "../../lib/formatters";

const DESCUENTO_PROMO = 1000;

export default function ResumenCarrito({ subtotal, alProcederAlPago }) {
  const [codigoPromo, setCodigoPromo] = useState("");
  const [promoAplicada, setPromoAplicada] = useState(false);
  const [errorPromo, setErrorPromo] = useState("");

  const total = Math.max(subtotal - (promoAplicada ? DESCUENTO_PROMO : 0), 0);

  const aplicarPromo = () => {
    if (codigoPromo.trim().toUpperCase() === "CHAMPIONS2026") {
      setPromoAplicada(true);
      setErrorPromo("");
    } else {
      setErrorPromo("Codigo invalido");
      setPromoAplicada(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-900 rounded-2xl p-6 text-white">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-5">
          Resumen del Pedido
        </h2>

        <div className="flex flex-col gap-3 text-sm mb-5">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal coleccion</span>
            <span className="font-semibold">{formatearPesos(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Envio estandar</span>
            <span className="font-bold text-green-400">GRATIS</span>
          </div>
          {promoAplicada && (
            <div className="flex justify-between text-green-400">
              <span>Descuento CHAMPIONS2026</span>
              <span>-{formatearPesos(DESCUENTO_PROMO)}</span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-700 pt-4 flex justify-between items-center mb-6">
          <span className="font-bold text-base">Total a pagar</span>
          <span className="text-yellow-400 font-black text-xl">
            {formatearPesos(total)}
          </span>
        </div>

        <Button
          onPress={alProcederAlPago}
          className="w-full bg-yellow-400 text-gray-900 font-black text-sm uppercase tracking-wider rounded-xl"
        >
          Proceder al Pago
        </Button>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <BadgeCheck size={13} className="text-green-400" />
            Productos oficiales FIFA con licencia
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={13} className="text-green-400" />
            Pago con encriptacion segura
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
          <Tag size={13} /> Codigo Promocional
        </p>
        <div className="flex gap-2">
          <Input
            value={codigoPromo}
            onValueChange={setCodigoPromo}
            placeholder="Ej. CHAMPIONS2026"
            variant="bordered"
            radius="sm"
            classNames={{ input: "uppercase" }}
            className="flex-1"
          />
          <Button
            onPress={aplicarPromo}
            className="bg-gray-900 text-white font-bold rounded-lg px-4 text-sm shrink-0"
          >
            Aplicar
          </Button>
        </div>
        {errorPromo && <p className="text-xs text-red-500 mt-1">{errorPromo}</p>}
        {promoAplicada && <p className="text-xs text-green-600 mt-1">Codigo aplicado</p>}
      </div>
    </div>
  );
}
