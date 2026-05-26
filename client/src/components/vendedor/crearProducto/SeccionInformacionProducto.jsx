import { Card, CardBody } from '@heroui/react'
import { Info } from 'lucide-react'
import { MAXIMO_CARACTERES_NOMBRE_PRODUCTO } from '../../../data/reglasProducto'

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
        <h3 className="text-2xl font-black text-slate-950">Informacion principal</h3>
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
        <EtiquetaCampo titulo="Descripcion">
          <textarea
            className={`${inputClasses} min-h-40 resize-y`}
            placeholder="Describi el producto, su estado y sus caracteristicas principales..."
            value={producto.description}
            onChange={(event) => onCambiar('description', event.target.value)}
          />
          <ErrorCampo mostrar={mostrarErrores && errores.description}>{errores.description}</ErrorCampo>
        </EtiquetaCampo>
        <div className="grid gap-6 md:grid-cols-3">
          <EtiquetaCampo titulo="Categoria">
            <select className={inputClasses} value={producto.categoria} onChange={(event) => onCambiar('categoria', event.target.value)}>
              {categorias.map((categoria) => (
                <option key={categoria.valor} value={categoria.valor}>{categoria.etiqueta}</option>
              ))}
            </select>
            <ErrorCampo mostrar={mostrarErrores && errores.categoria}>{errores.categoria}</ErrorCampo>
          </EtiquetaCampo>
          <EtiquetaCampo titulo="Seleccion">
            <select className={inputClasses} value={producto.seleccion} onChange={(event) => onCambiar('seleccion', event.target.value)}>
              {selecciones.map((seleccion) => (
                <option key={seleccion.valor} value={seleccion.valor}>{seleccion.etiqueta}</option>
              ))}
            </select>
            <ErrorCampo mostrar={mostrarErrores && errores.seleccion}>{errores.seleccion}</ErrorCampo>
          </EtiquetaCampo>
          <EtiquetaCampo titulo="Stock disponible">
            <input className={inputClasses} min="0" type="number" value={producto.stock} onChange={(event) => onCambiar('stock', event.target.value)} />
            <ErrorCampo mostrar={mostrarErrores && errores.stock}>{errores.stock}</ErrorCampo>
          </EtiquetaCampo>
        </div>
      </div>
    </CardBody>
  </Card>
)

export default SeccionInformacionProducto
