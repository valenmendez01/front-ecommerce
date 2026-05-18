export default function PanelPedido({ articulos }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">Tu selección</h3>
        <p className="text-xs text-gray-400">{articulos.length} producto(s)</p>
      </div>

      <div className="divide-y divide-gray-50">
        {articulos.map((articulo) => (
          <div key={articulo.id} className="flex items-center gap-3 p-4">
            <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
              <span className="text-yellow-400 text-lg">★</span>
            </div>

            <div className="flex-1 min-w-0">
              {articulo.etiqueta && (
                <span className="text-[9px] font-bold bg-yellow-400 text-gray-900 px-1.5 py-0.5 rounded mr-1">
                  {articulo.etiqueta}
                </span>
              )}
              <p className="text-sm font-semibold text-gray-900 truncate">{articulo.nombre}</p>
              <p className="text-xs text-gray-400">{articulo.subtitulo}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                x{articulo.cantidad}
              </span>
            </div>

            <p className="text-sm font-bold text-gray-900 w-16 text-right">
              ${(articulo.precio * articulo.cantidad).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
