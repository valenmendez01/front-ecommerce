const CampoDetalleProducto = ({ children, etiqueta }) => (
  <div className="rounded-md bg-white px-4 py-3">
    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{etiqueta}</p>
    <div className="mt-1.5 font-black text-green-primary">{children}</div>
  </div>
)

export default CampoDetalleProducto
