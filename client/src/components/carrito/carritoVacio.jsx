import { ShoppingBag } from "lucide-react";

export default function CarritoVacio() {
  return (
    <div className="text-center py-24 text-emerald-950">
      <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />

      <p className="text-lg font-semibold">Tu bolsa está vacía</p>

      <p className="text-sm mt-1">Agregá productos para continuar</p>
    </div>
  );
}
