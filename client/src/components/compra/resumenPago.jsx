import { ShieldCheck, Rocket } from "lucide-react";

const UMBRAL_PACK_GRATIS = 150;

export default function ResumenPago({ articulos, alConfirmar, puedeConfirmar }) {
  const subtotal = articulos.reduce((acc, a) => acc + a.precio * a.cantidad, 0);
  const envio = 12.5;
  const impuesto = subtotal * 0.08;
  const total = subtotal + envio + impuesto;

  const progreso = Math.min((subtotal / UMBRAL_PACK_GRATIS) * 100, 100);
  const restante = Math.max(UMBRAL_PACK_GRATIS - subtotal, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-900 text-white rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-5">
          Resumen del Pedido
        </h2>

        <div className="flex flex-col gap-3 text-sm mb-5">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Envío (Express Global)</span>
            <span className="font-bold text-yellow-400">${envio.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Impuesto estimado</span>
            <span className="font-semibold">${impuesto.toFixed(2)}</span>
          </div>
        </div>

        {/* Progreso pack gratis */}
        <div className="bg-gray-800 rounded-xl p-3 mb-5">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-400 font-bold uppercase tracking-wider">
              Progreso Pack Gratis
            </span>
            <span className="text-green-400 font-bold">{Math.round(progreso)}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>
          {restante > 0 ? (
            <p className="text-xs text-gray-400 mt-1.5">
              Gastá ${restante.toFixed(2)} más para un Pack Premium gratis
            </p>
          ) : (
            <p className="text-xs text-green-400 mt-1.5 font-bold">
              ¡Pack Premium desbloqueado! 🎉
            </p>
          )}
        </div>

        <div className="border-t border-gray-700 pt-4 flex justify-between items-center mb-5">
          <span className="font-bold">Total</span>
          <span className="text-yellow-400 font-black text-xl">${total.toFixed(2)}</span>
        </div>

        <button
          onClick={alConfirmar}
          disabled={!puedeConfirmar}
          className={`w-full py-3 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            puedeConfirmar
              ? "bg-green-400 text-gray-900 hover:bg-green-300"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Rocket size={16} />
          {puedeConfirmar ? "Confirmar Pedido" : "Completá los datos"}
        </button>

        {!puedeConfirmar && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Completá envío y pago para continuar
          </p>
        )}

        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
          <ShieldCheck size={12} className="text-green-400" />
          Pago SSL Seguro
        </div>
      </div>

      {/* Garantía */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-xs text-gray-500 leading-relaxed">
        <p className="font-bold text-gray-700 mb-1">Garantía del Coleccionista</p>
        Todos los stickers son productos oficiales FIFA 2026 con licencia. Devoluciones aceptadas
        para packs sin abrir dentro de los 30 días.
      </div>
    </div>
  );
}