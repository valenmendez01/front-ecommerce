import { ShoppingBag } from "lucide-react";

export default function TituloCarrito() {
  return (
    <div className="mb-5">
      <h1 className="flex items-center gap-3 font-display text-3xl uppercase tracking-wide text-green-primary sm:text-4xl">
        <ShoppingBag size={28} className="text-green-primary" />
        Tu bolsa de colección
      </h1>

      <div className="mt-2 h-1 w-16 rounded-full bg-dorado-primary" />
    </div>
  );
}
