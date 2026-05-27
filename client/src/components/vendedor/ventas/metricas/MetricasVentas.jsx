import { ReceiptText, ShoppingBag, WalletCards } from 'lucide-react'
import TarjetaMetrica from '../../panel/metricas/TarjetaMetrica'
import { formatearPesosVenta } from '../datos/formatoVentasVendedor'

const MetricasVentas = ({ ventas }) => {
  const totalVendido = ventas.reduce((total, venta) => total + venta.total, 0)
  const productosVendidos = ventas.reduce((total, venta) => total + venta.cantidad, 0)
  const metricas = [
    { titulo: 'Total vendido', valor: formatearPesosVenta(totalVendido), descripcion: 'Importe generado por ventas registradas', Icono: WalletCards, destacar: true },
    { titulo: 'Ventas realizadas', valor: ventas.length, descripcion: 'Operaciones registradas', Icono: ReceiptText },
    { titulo: 'Productos vendidos', valor: productosVendidos, descripcion: 'Unidades vendidas en total', Icono: ShoppingBag },
  ]

  return (
    <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
}

export default MetricasVentas
