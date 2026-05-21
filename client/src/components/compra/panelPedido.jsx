import { formatearPesos } from "../../data/reglasProducto";

export default function PanelPedido({ articulos }) {
  return (
    <div className="bg-emerald-950 rounded-2xl border border-emerald-900 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-yellow-400/30">
        <h3 className="font-bold text-white">Tu seleccion</h3>
        <p className="text-xs text-white/60">{articulos.length} producto(s)</p>
      </div>

      <div className="divide-y divide-yellow-400/20">
        {articulos.map((articulo) => (
          <div key={articulo.id} className="flex items-center gap-3 p-4">
            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shrink-0">
              <span className="text-yellow-500 text-lg">*</span>
            </div>

            <div className="flex-1 min-w-0">
              {articulo.etiqueta && (
                <span className="text-[9px] font-bold bg-yellow-400 text-black px-1.5 py-0.5 rounded mr-1">
                  {articulo.etiqueta}
                </span>
              )}
              <p className="text-sm font-semibold text-white truncate">{articulo.nombre}</p>
              <p className="text-xs text-yellow-400">{articulo.subtitulo}</p>
            </div>

            <span className="text-xs font-bold text-black bg-white px-3 py-1 rounded-lg">
              x{articulo.cantidad}
            </span>

            <p className="text-sm font-bold text-white w-16 text-right">
              {formatearPesos(articulo.precio * articulo.cantidad)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
