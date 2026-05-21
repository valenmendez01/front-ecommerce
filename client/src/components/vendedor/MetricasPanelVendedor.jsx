import TarjetaMetrica from './TarjetaMetrica'

const MetricasPanelVendedor = ({ metricas }) => (
  <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    {metricas.map((metrica) => (
      <TarjetaMetrica
        Icono={metrica.Icono}
        descripcion={metrica.descripcion}
        destacar={metrica.destacar}
        key={metrica.titulo}
        titulo={metrica.titulo}
        valor={metrica.valor}
      />
    ))}
  </section>
)

export default MetricasPanelVendedor
