import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

export default function HeaderCarrito({ alVolverInicio }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-black text-blue-700 text-xl italic tracking-tight">
          FIGULLECT
        </span>

        <Button
          variant="light"
          startContent={<ArrowLeft size={16} />}
          onPress={alVolverInicio}
          className="text-sm text-gray-500"
        >
          Volver inicio
        </Button>
      </div>
    </header>
  );
}
