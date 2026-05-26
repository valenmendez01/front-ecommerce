import TarjetaResumen from './TarjetaResumen'
import PerfilCuentaCompacto from './PerfilCuentaCompacto'

const EncabezadoCuenta = ({ resumen, usuario }) => (
  <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <h2 className="text-6xl font-black uppercase leading-none text-green-primary md:text-7xl">
        Hola,
        <br />
        {usuario.nombre}
      </h2>
      <p className="mt-5 max-w-xl text-xl leading-relaxed text-slate-700">
        Gestiona tus datos y pedidos.
      </p>
    </div>

    <div className="flex flex-col gap-4">
      <PerfilCuentaCompacto usuario={usuario} />
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
