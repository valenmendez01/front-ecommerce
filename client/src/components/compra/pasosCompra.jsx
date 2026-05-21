const PASOS = ["Carrito", "Informacion", "Confirmacion"];

export default function PasosCompra() {
  return (
    <div className="flex items-center gap-2 mb-8">
      {PASOS.map((paso, indice) => (
        <div key={paso} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
              indice === 2 ? "bg-yellow-400 text-black" : "bg-emerald-950 text-white"
            }`}
          >
            {indice + 1}
          </div>

          <span className={`text-xs font-semibold ${indice === 2 ? "text-black" : "text-emerald-900/60"}`}>
            {paso}
          </span>

          {indice < PASOS.length - 1 && <div className="w-8 h-px bg-yellow-400/50" />}
        </div>
      ))}

      <p className="ml-2 text-xs text-emerald-900/60">
        Paso 3 de 3: Confirmacion segura
      </p>
    </div>
  );
}
