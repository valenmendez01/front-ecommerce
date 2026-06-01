import { Card, CardBody } from '@heroui/react'
import { Info } from 'lucide-react'
import { MAXIMO_CARACTERES_NOMBRE_PRODUCTO, MAXIMO_STOCK_PRODUCTO } from '../datos/reglasCrearProducto'

const inputClasses =
  'mt-2 w-full rounded-md border border-dorado-primary/35 bg-white px-5 py-4 text-base font-semibold text-slate-800 outline-none transition focus:border-dorado-primary focus:bg-white'

const EtiquetaCampo = ({ children, titulo }) => (
  <label className="block">
    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{titulo}</span>
    {children}
  </label>
)

const ErrorCampo = ({ children, mostrar }) =>
  mostrar ? <p className="mt-2 text-sm font-semibold text-red-700">{children}</p> : null

const SeccionInformacionProducto = ({ categorias, errores, mostrarErrores, onCambiar, producto, selecciones }) => (
  <Card className="shadow-lg bg-dorado-primary/10" radius="sm">
    <CardBody className="px-8 py-8">
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-primary text-dorado-primary">
          <Info size={18} />
        </div>
        <h3 className="text-2xl font-black text-slate-950">Información principal</h3>
      </div>
      <div className="space-y-6">
        <EtiquetaCampo titulo="Nombre del producto">
          <input
            className={inputClasses}
            maxLength={MAXIMO_CARACTERES_NOMBRE_PRODUCTO}
            placeholder="Nombre del producto"
            value={producto.nombre}
            onChange={(event) => onCambiar('nombre', event.target.value)}
          />
          <p className="mt-2 text-right text-xs font-semibold text-slate-400">
            {producto.nombre.length}/{MAXIMO_CARACTERES_NOMBRE_PRODUCTO}
          </p>
          <ErrorCampo mostrar={mostrarErrores && errores.nombre}>{errores.nombre}</ErrorCampo>
        </EtiquetaCampo>
        <EtiquetaCampo titulo="Descripción">
          <textarea
            className={`${inputClasses} min-h-40 resize-y`}
            placeholder="Describí el producto, su estado y sus características principales..."
            value={producto.description}
            onChange={(event) => onCambiar('description', event.target.value)}
          />
          <ErrorCampo mostrar={mostrarErrores && errores.description}>{errores.description}</ErrorCampo>
        </EtiquetaCampo>
        <div className="grid gap-6 md:grid-cols-3">
          <EtiquetaCampo titulo="Categoría">
            <select className={inputClasses} value={producto.categoria} onChange={(event) => onCambiar('categoria', event.target.value)}>
              {categorias.map((categoria) => (
                <option key={categoria.valor} value={categoria.valor}>{categoria.etiqueta}</option>
              ))}
            </select>
            <ErrorCampo mostrar={mostrarErrores && errores.categoria}>{errores.categoria}</ErrorCampo>
          </EtiquetaCampo>
          <EtiquetaCampo titulo="Selección">
            <select className={inputClasses} value={producto.seleccion} onChange={(event) => onCambiar('seleccion', event.target.value)}>
              {selecciones.map((seleccion) => (
                <option key={seleccion.valor} value={seleccion.valor}>{seleccion.etiqueta}</option>
              ))}
            </select>
            <ErrorCampo mostrar={mostrarErrores && errores.seleccion}>{errores.seleccion}</ErrorCampo>
          </EtiquetaCampo>
          <EtiquetaCampo titulo="Stock disponible">
            <input className={inputClasses} max={MAXIMO_STOCK_PRODUCTO} min="0" step="1" type="number" value={producto.stock} onChange={(event) => onCambiar('stock', event.target.value)} />
            <ErrorCampo mostrar={mostrarErrores && errores.stock}>{errores.stock}</ErrorCampo>
          </EtiquetaCampo>
        </div>
        <label className="flex items-center justify-between gap-4 rounded-md border border-dorado-primary/35 bg-dorado-primary/10 px-5 py-4">
          <div>
            <span className="block text-sm font-black uppercase tracking-widest text-green-primary">
              Producto destacado
            </span>
            <span className="text-sm font-semibold text-slate-500">
              Mostrar este producto en la sección principal del Home.
            </span>
          </div>
          <input
            checked={Boolean(producto.destacado)}
            className="h-5 w-5 accent-green-primary"
            type="checkbox"
            onChange={(event) => onCambiar('destacado', event.target.checked)}
          />
        </label>
      </div>
    </CardBody>
  </Card>
)

export default SeccionInformacionProducto
