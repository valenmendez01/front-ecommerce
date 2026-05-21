import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

export default function HeaderCompra({ alVolverCarrito }) {
  return (
    <header className="bg-emerald-950 border-b border-yellow-500/30 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-black text-white text-xl italic tracking-tight">
          FIGULLECT
        </span>

        <Button
          variant="light"
          startContent={<ArrowLeft size={16} />}
          onPress={alVolverCarrito}
          className="text-sm text-white"
        >
          Volver al carrito
        </Button>
      </div>
    </header>
  );
}
