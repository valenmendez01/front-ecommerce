import { Button } from "@heroui/react";
import { PackageCheck } from "lucide-react";

export default function PedidoConfirmado({ alVolverInicio }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8 bg-emerald-950 rounded-2xl">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <PackageCheck size={36} className="text-emerald-950" />
        </div>

        <h1 className="text-2xl font-black text-white mb-2">
          Pedido Confirmado
        </h1>

        <p className="text-white/70 mb-6">
          Recibiras un email con los detalles de tu coleccion. Gracias por tu compra.
        </p>

        <Button
          onPress={alVolverInicio}
          className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
