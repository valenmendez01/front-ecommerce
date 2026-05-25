import { ShoppingBag } from "lucide-react";

export default function TituloCarrito() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
        <ShoppingBag size={28} className="text-emerald-900" />
        Tu Bolsa de Colección
      </h1>

      <div className="h-1 w-16 bg-yellow-400 rounded-full mt-2" />
    </div>
  );
}
