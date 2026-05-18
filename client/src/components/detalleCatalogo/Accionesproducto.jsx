import { useState } from "react";
import { Button } from "@heroui/react";
import { ShoppingCart, Minus, Plus } from "lucide-react";

export const AccionesProducto = ({ stock }) => {
  const [cantidad, setCantidad] = useState(1);

  function incrementar() {
    setCantidad((prev) => prev + 1);
  }

  function decrementar() {
    setCantidad((prev) => (prev > 1 ? prev - 1 : 1));
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Selector de cantidad */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500">Cantidad:</p>
        <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1">
          <button onClick={decrementar} className="text-gray-500 hover:text-gray-900 transition-colors">
            <Minus size={16} />
          </button>
          <span className="w-6 text-center font-medium">{cantidad}</span>
          <button onClick={incrementar} className="text-gray-500 hover:text-gray-900 transition-colors">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Botones */}
      <Button
        color="primary"
        size="lg"
        isDisabled={!stock}
        startContent={<ShoppingCart size={18} />}
        className="w-full font-semibold"
        onPress={() => console.log("Agregar al carrito", cantidad)}
      >
        Agregar al carrito
      </Button>

    </div>
  );
};