import logo from '../../../assets/logoHorizontal.png'
import ItemBeneficioAuth from './ItemBeneficioAuth'

const PanelPresentacionAuth = ({ etiqueta, titulo, descripcion, beneficios, variante = 'login' }) => {
  const decoracionLogin = variante === 'login'

  return (
    <div className="relative flex min-h-[560px] flex-col justify-between overflow-hidden bg-[#142b10] px-8 py-8 text-white md:px-12">
      <div
        className={`absolute h-64 w-64 rounded-full border border-[#caa56e]/25 ${
          decoracionLogin ? '-right-24 -top-24' : '-left-20 top-20'
        }`}
      />
      <div
        className={`absolute h-72 w-72 rounded-full border border-[#caa56e]/20 ${
          decoracionLogin ? '-bottom-28 left-12' : '-right-28 -bottom-24'
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/25 to-transparent" />

      <div className="relative">
        <img className="h-14 w-auto" src={logo} alt="Figullect" />
      </div>

      <div className="relative max-w-xl">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-[#caa56e]">{etiqueta}</p>
        <h1 className="mt-5 text-5xl font-black uppercase leading-none md:text-7xl">{titulo}</h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-white/75">{descripcion}</p>
      </div>

      <div className="relative grid gap-3 text-sm font-semibold text-white/80 sm:grid-cols-2">
        {beneficios.map((beneficio) => (
          <ItemBeneficioAuth key={beneficio.texto} {...beneficio} />
        ))}
      </div>
    </div>
  )
}

export default PanelPresentacionAuth
