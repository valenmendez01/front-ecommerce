import { Sparkles } from "lucide-react";
import { formatearPesos } from "../../lib/formatters";

const RECOMENDADOS = [
  { id: "r1", nombre: "Album Tapa Dura", precio: 3500 },
  { id: "r2", nombre: "Fundas Anti-Reflejos (100u)", precio: 1200 },
  { id: "r3", nombre: "Acceso VIP Pass", precio: 9900 },
];

export default function itemsRecomendados({ alAgregar }) {
  return (
    <div className="mt-8">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">
        <Sparkles size={15} />
        Completá tu colección
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {RECOMENDADOS.map((articulo) => (
          <button
            key={articulo.id}
            onClick={() => alAgregar(articulo)}
            className="group bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-left hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-full aspect-square bg-gray-900 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-yellow-400 text-2xl">★</span>
            </div>
            <p className="text-xs font-semibold text-gray-800 leading-tight">{articulo.nombre}</p>
            <p className="text-sm font-black text-green-600 mt-0.5">{formatearPesos(articulo.precio)}</p>
            <span className="text-[10px] text-blue-600 font-bold group-hover:underline">
              + Agregar
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
