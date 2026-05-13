import { ShieldCheck, BadgeCheck, Tag } from "lucide-react";
import { useState } from "react";

export default function ResumenCarrito({ subtotal, impuesto = 0.08, alProcederAlPago }) {
  const [codigoPromo, setCodigoPromo] = useState("");
  const [promoAplicada, setPromoAplicada] = useState(false);
  const [errorPromo, setErrorPromo] = useState("");

  const montoImpuesto = subtotal * impuesto;
  const total = subtotal + montoImpuesto;

  const aplicarPromo = () => {
    if (codigoPromo.trim().toUpperCase() === "CHAMPIONS2026") {
      setPromoAplicada(true);
      setErrorPromo("");
    } else {
      setErrorPromo("Código inválido");
      setPromoAplicada(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Resumen del pedido */}
      <div className="bg-gray-900 rounded-2xl p-6 text-white">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-5">
          Resumen del Pedido
        </h2>

        <div className="flex flex-col gap-3 text-sm mb-5">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal colección</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Impuesto (8%)</span>
            <span className="font-semibold">${montoImpuesto.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Envío estándar</span>
            <span className="font-bold text-green-400">GRATIS</span>
          </div>
          {promoAplicada && (
            <div className="flex justify-between text-green-400">
              <span>Descuento CHAMPIONS2026</span>
              <span>-$10.00</span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-700 pt-4 flex justify-between items-center mb-6">
          <span className="font-bold text-base">Total a pagar</span>
          <span className="text-yellow-400 font-black text-xl">
            ${(total - (promoAplicada ? 10 : 0)).toFixed(2)}
          </span>
        </div>

        <button
          onClick={alProcederAlPago}
          className="w-full bg-yellow-400 text-gray-900 font-black text-sm uppercase tracking-wider rounded-xl py-3 hover:bg-yellow-300 transition-colors"
        >
          Proceder al Pago ⚽
        </button>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <BadgeCheck size={13} className="text-green-400" />
            Productos oficiales FIFA con licencia
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={13} className="text-green-400" />
            Pago con encriptación segura
          </div>
        </div>
      </div>

      {/* Código promocional */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
          <Tag size={13} /> Código Promocional
        </p>
        <div className="flex gap-2">
          <input
            value={codigoPromo}
            onChange={(e) => setCodigoPromo(e.target.value)}
            placeholder="Ej. CHAMPIONS2026"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm uppercase outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors"
          />
          <button
            onClick={aplicarPromo}
            className="bg-gray-900 text-white font-bold rounded-lg px-4 text-sm shrink-0 hover:bg-gray-800 transition-colors"
          >
            Aplicar
          </button>
        </div>
        {errorPromo && <p className="text-xs text-red-500 mt-1">{errorPromo}</p>}
        {promoAplicada && <p className="text-xs text-green-600 mt-1">✓ Código aplicado</p>}
      </div>
    </div>
  );
}