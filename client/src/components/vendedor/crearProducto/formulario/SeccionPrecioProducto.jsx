import { Card, CardBody } from '@heroui/react'
import { DollarSign } from 'lucide-react'
import { MAXIMO_DESCUENTO_PRODUCTO, MAXIMO_PRECIO_PRODUCTO } from '../datos/numerosCrearProducto'
import CampoNumericoCrearProducto from './CampoNumericoCrearProducto'
import VistaPrecioProducto from './VistaPrecioProducto'

const inputClasses =
  'mt-2 w-full rounded-md border border-dorado-primary/35 bg-white px-5 py-4 text-base font-semibold text-slate-800 outline-none transition focus:border-dorado-primary focus:bg-white'

const CampoPrecio = ({ children, error, mostrarError, titulo }) => (
  <label className="block">
    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{titulo}</span>
    {children}
    {mostrarError && <p className="mt-2 text-sm font-semibold text-red-700">{error}</p>}
  </label>
)

const SeccionPrecioProducto = ({ errores, mostrarErrores, onCambiar, precioFinal, producto }) => (
  <Card className="shadow-lg bg-dorado-primary/10" radius="sm">
    <CardBody className="px-8 py-8">
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-primary text-dorado-primary">
          <DollarSign size={18} />
        </div>
        <h3 className="text-2xl font-black text-slate-950">Precio y descuento</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <CampoPrecio error={errores.precio} mostrarError={mostrarErrores && errores.precio} titulo="Precio base">
          <CampoNumericoCrearProducto campo="precio" className={inputClasses} maximo={MAXIMO_PRECIO_PRODUCTO} onCambiar={onCambiar} placeholder="Precio base" valor={producto.precio} />
        </CampoPrecio>
        <CampoPrecio error={errores.descuento} mostrarError={mostrarErrores && errores.descuento} titulo="Descuento (%)">
          <CampoNumericoCrearProducto campo="descuento" className={inputClasses} maximo={MAXIMO_DESCUENTO_PRODUCTO} onCambiar={onCambiar} valor={producto.descuento} />
        </CampoPrecio>
      </div>
      <VistaPrecioProducto
        precio={Number(producto.precio)}
        precioFinal={precioFinal}
        tieneDescuento={Number(producto.descuento) > 0}
      />
    </CardBody>
  </Card>
)

export default SeccionPrecioProducto
