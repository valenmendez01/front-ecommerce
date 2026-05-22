const CampoDetalleProducto = ({ children, etiqueta }) => (
  <div className="rounded-md bg-white p-4">
    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{etiqueta}</p>
    <div className="mt-2 font-black text-green-primary">{children}</div>
  </div>
)

export default CampoDetalleProducto
