import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";

import { formatearPesos } from "../../lib/formatters";

export default function BarraPagoMovil({ subtotal, alIrAlPago }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-emerald-950 border-t border-yellow-400/30 shadow-lg">
      <Button
        onPress={alIrAlPago}
        endContent={<ArrowRight size={16} />}
        className="w-full bg-yellow-400 text-black font-black rounded-xl text-sm uppercase tracking-wider"
      >
        Ir al Pago - {formatearPesos(subtotal)}
      </Button>
    </div>
  );
}
