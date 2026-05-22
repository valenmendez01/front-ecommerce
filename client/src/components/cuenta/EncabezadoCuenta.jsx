import TarjetaResumen from './TarjetaResumen'

const EncabezadoCuenta = ({ resumen, usuario }) => (
  <section className="overflow-hidden rounded-2xl border border-[#d8c49a] bg-[#142b10] p-8 text-white shadow-2xl shadow-[#142b10]/10">
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p className="text-sm font-black uppercase tracking-[0.35em] text-[#caa56e]">
        Mi cuenta
      </p>
      <h2 className="mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
        Hola,
        <br />
        {usuario.nombre}
      </h2>
      <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
        Revisa tus datos, segui tus pedidos y mantenete cerca de las figuritas que te faltan para completar el album.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      {resumen.map((item) => (
        <TarjetaResumen
          destacar={item.destacar}
          key={item.titulo}
          titulo={item.titulo}
          valor={item.valor}
        />
      ))}
    </div>
    </div>
  </section>
)

export default EncabezadoCuenta
