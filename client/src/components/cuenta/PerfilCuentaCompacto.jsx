const PerfilCuentaCompacto = ({ usuario }) => {
  const iniciales = `${usuario.nombre?.[0] || ''}${usuario.apellido?.[0] || ''}`.toUpperCase()

  return (
    <div className="flex min-w-64 items-center gap-4 rounded-xl border border-dorado-primary/40 bg-[#fffdf8] px-5 py-4 shadow-lg shadow-green-primary/5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dorado-primary bg-white text-base font-black text-green-primary">
        {iniciales}
      </div>
      <div className="min-w-0">
        <p className="truncate text-lg font-black text-green-primary">
          {usuario.nombre} {usuario.apellido}
        </p>
        <p className="text-sm font-medium text-slate-500">Cuenta de cliente</p>
      </div>
    </div>
  )
}

export default PerfilCuentaCompacto
