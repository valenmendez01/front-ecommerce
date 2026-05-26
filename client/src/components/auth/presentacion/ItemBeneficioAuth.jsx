const ItemBeneficioAuth = ({ icono: Icono, texto }) => (
  <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
    <Icono className="text-[#caa56e]" size={20} />
    {texto}
  </div>
)

export default ItemBeneficioAuth
