import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";

import { formatearPesos } from "../../data/reglasProducto";

export default function BarraPagoMovil({ subtotal, alIrAlPago }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-green-primary border-t border-dorado-primary/30 shadow-lg">
      <Button
        onPress={alIrAlPago}
        endContent={<ArrowRight size={16} />}
        className="w-full bg-dorado-primary text-black font-black rounded-xl text-sm uppercase tracking-wider"
      >
        Ir al pago - {formatearPesos(subtotal)}
      </Button>
    </div>
  );
}
