import { ShieldCheck, Rocket } from "lucide-react";
import { Button } from "@heroui/react";
import { formatearPesos } from "../../lib/formatters";

export default function ResumenPago({ articulos, alConfirmar, puedeConfirmar, cargando }) {
  const subtotal = articulos.reduce((acc, a) => acc + a.precio * a.cantidad, 0);
  const envio = 0;
  const impuesto = 0;
  const total = subtotal + envio + impuesto;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-900 text-white rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-5">
          Resumen del Pedido
        </h2>

        <div className="flex flex-col gap-3 text-sm mb-5">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal</span>
            <span className="font-semibold">{formatearPesos(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Envio</span>
            <span className="font-bold text-green-400">GRATIS</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Impuesto estimado</span>
            <span className="font-semibold">{formatearPesos(impuesto)}</span>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 flex justify-between items-center mb-5">
          <span className="font-bold">Total</span>
          <span className="text-yellow-400 font-black text-xl">{formatearPesos(total)}</span>
        </div>

        <Button
          onPress={alConfirmar}
          isDisabled={!puedeConfirmar || cargando}
          startContent={!cargando && <Rocket size={16} />}
          className={`w-full rounded-xl font-black text-sm uppercase tracking-wider ${
            puedeConfirmar && !cargando
              ? "bg-green-400 text-gray-900 hover:bg-green-300"
              : "bg-gray-700 text-gray-500"
          }`}
        >
          {cargando ? "Confirmando..." : puedeConfirmar ? "Confirmar Pedido" : "Completa los datos"}
        </Button>

        {!puedeConfirmar && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Completa envio y pago para continuar
          </p>
        )}

        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
          <ShieldCheck size={12} className="text-green-400" />
          Pago SSL Seguro
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-xs text-gray-500 leading-relaxed">
        <p className="font-bold text-gray-700 mb-1">Garantia del Coleccionista</p>
        Todos los stickers son productos oficiales FIFA 2026 con licencia. Devoluciones aceptadas
        para packs sin abrir dentro de los 30 dias.
      </div>
    </div>
  );
}
