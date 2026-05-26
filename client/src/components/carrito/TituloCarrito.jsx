import { ShoppingBag } from "lucide-react";

export default function TituloCarrito() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-black text-green-primary uppercase tracking-tight flex items-center gap-3">
        <ShoppingBag size={28} className="text-green-primary" />
        Tu bolsa de colección
      </h1>

      <div className="h-1 w-16 bg-dorado-primary rounded-full mt-2" />
    </div>
  );
}
