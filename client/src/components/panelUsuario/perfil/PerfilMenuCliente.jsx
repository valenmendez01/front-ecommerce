const PerfilMenuCliente = ({ iniciales, rolCuenta, usuario }) => (
  <div className="border-b border-dorado-primary/35 px-5 py-5">
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dorado-primary bg-white text-sm font-black text-green-primary">
        {iniciales}
      </div>
      <div>
        <p className="font-bold text-green-primary">
          {usuario.nombre} {usuario.apellido}
        </p>
        <p className="text-sm text-slate-500">Cuenta de {rolCuenta}</p>
      </div>
    </div>
  </div>
)

export default PerfilMenuCliente
