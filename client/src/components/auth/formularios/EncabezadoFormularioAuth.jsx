const EncabezadoFormularioAuth = ({ etiqueta, titulo, descripcion }) => (
  <div className="mb-8">
    <p className="text-sm font-black uppercase tracking-[0.25em] text-[#8d6f3e]">{etiqueta}</p>
    <h2 className="mt-3 text-3xl font-black text-[#142b10]">{titulo}</h2>
    <p className="mt-2 text-sm leading-6 text-[#5f6d5a]">{descripcion}</p>
  </div>
)

export default EncabezadoFormularioAuth
