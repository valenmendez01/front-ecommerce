const PROGRESO_COLECCION = 85;

export default function ProgresoColeccion() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
          Progreso coleccion: Edicion Gold
        </p>

        <span className="text-sm font-black text-green-500">
          {PROGRESO_COLECCION}% COMPLETO
        </span>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-400 rounded-full transition-all"
          style={{ width: `${PROGRESO_COLECCION}%` }}
        />
      </div>
    </div>
  );
}
