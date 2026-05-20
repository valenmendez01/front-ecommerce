import { Button, Card, Chip, Input, Select, SelectItem } from '@heroui/react'
import {
  Check,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Percent,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { categoriasProducto, obtenerEtiquetaCategoria } from '../../data/categoriasProducto'

const coloresEstado = {
  ACTIVO: 'bg-green-100 text-green-700',
  'STOCK BAJO': 'bg-yellow-100 text-yellow-700',
  'SIN STOCK': 'bg-red-100 text-red-700',
  INACTIVO: 'bg-slate-200 text-slate-600',
}

const estadosPublicacion = [
  { key: 'activa', label: 'Activa' },
  { key: 'inactiva', label: 'Inactiva' },
]

const obtenerEstado = (producto) => {
  if (!producto.activo) return 'INACTIVO'
  if (producto.stock === 0) return 'SIN STOCK'
  if (producto.stock <= 5) return 'STOCK BAJO'
  return 'ACTIVO'
}

const formatearPesos = (monto) => `$${monto.toLocaleString('es-AR')}`
const calcularPrecioFinal = (precio, descuento) => Math.round(precio * (1 - descuento / 100))

const obtenerPrecios = (producto) => {
  const descuento = Number(producto.descuento)
  const precio = Number(producto.precio)
  const precioFinal = calcularPrecioFinal(precio, descuento)

  return {
    tieneDescuento: descuento > 0,
    precioOriginalTexto: formatearPesos(precio),
    precioFinalTexto: formatearPesos(precioFinal),
  }
}

const PrecioConDescuento = ({ producto, compacto = false }) => {
  const { tieneDescuento, precioOriginalTexto, precioFinalTexto } = obtenerPrecios(producto)

  if (!tieneDescuento) {
    return <span className="font-black text-[#0b2b88]">{precioOriginalTexto}</span>
  }

  return (
    <div className={`flex ${compacto ? 'items-center gap-2' : 'flex-col gap-1'}`}>
      <span className="text-sm font-bold text-slate-400 line-through">{precioOriginalTexto}</span>
      <span className="font-black text-red-700">{precioFinalTexto}</span>
    </div>
  )
}

const CampoDetalle = ({ etiqueta, children }) => (
  <div className="rounded-md bg-white p-4">
    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{etiqueta}</p>
    <div className="mt-2 font-black text-[#0b2b88]">{children}</div>
  </div>
)

const fieldClassNames = {
  errorMessage: 'font-semibold',
  input: 'font-bold text-[#0b2b88]',
  inputWrapper:
    'border border-slate-200 bg-slate-50 shadow-none data-[hover=true]:bg-slate-50 group-data-[focus=true]:border-[#0b2b88] group-data-[focus=true]:bg-white',
  trigger:
    'border border-slate-200 bg-slate-50 shadow-none data-[hover=true]:bg-slate-50 data-[open=true]:border-[#0b2b88]',
  value: 'font-bold text-[#0b2b88]',
}

const obtenerErrorNumero = (valor, tipo) => {
  if (valor === '' || Number.isNaN(Number(valor))) {
    return 'Este campo es obligatorio.'
  }

  if (Number(valor) < 0) {
    return 'El valor no puede ser negativo.'
  }

  if (tipo === 'descuento' && Number(valor) > 100) {
    return 'El descuento no puede superar el 100%.'
  }

  return ''
}

const obtenerPrimerValor = (keys) => Array.from(keys)[0]

const TablaProductos = ({ cargando = false, error = '', productos, onActualizarProducto, onEliminarProducto }) => {
  const [mostrarTodos, setMostrarTodos] = useState(false)
  const [productoAbierto, setProductoAbierto] = useState(null)
  const [productoEditando, setProductoEditando] = useState(null)
  const [borrador, setBorrador] = useState(null)
  const [idGuardando, setIdGuardando] = useState(null)
  const [idEliminando, setIdEliminando] = useState(null)
  const [errorAccion, setErrorAccion] = useState('')
  const productosVisibles = mostrarTodos ? productos : productos.slice(0, 2)
  const puedeVerTodos = productos.length > 2

  const cambiarProductoAbierto = (idProducto) => {
    setProductoAbierto(productoAbierto === idProducto ? null : idProducto)
    setProductoEditando(null)
    setBorrador(null)
    setErrorAccion('')
  }

  const eliminarProducto = async (idProducto) => {
    setIdEliminando(idProducto)
    setErrorAccion('')

    try {
      await onEliminarProducto(idProducto)

      if (productoEditando === idProducto) {
        setProductoEditando(null)
        setBorrador(null)
      }
    } catch (errorEliminar) {
      setErrorAccion(errorEliminar.message || 'No se pudo desactivar el producto.')
    } finally {
      setIdEliminando(null)
    }
  }

  const iniciarEdicion = (producto) => {
    setProductoEditando(producto.idProducto)
    setBorrador({ ...producto })
    setErrorAccion('')
  }

  const cancelarEdicion = () => {
    setProductoEditando(null)
    setBorrador(null)
    setErrorAccion('')
  }

  const guardarEdicion = async () => {
    const tieneErrores =
      obtenerErrorNumero(borrador.precio, 'precio') ||
      obtenerErrorNumero(borrador.stock, 'stock') ||
      obtenerErrorNumero(borrador.descuento, 'descuento')

    if (tieneErrores) {
      return
    }

    setIdGuardando(borrador.idProducto)
    setErrorAccion('')

    try {
      await onActualizarProducto(borrador)
      setProductoEditando(null)
      setBorrador(null)
    } catch (errorActualizar) {
      setErrorAccion(errorActualizar.message || 'No se pudo actualizar el producto.')
    } finally {
      setIdGuardando(null)
    }
  }

  const cambiarCampo = (campo, valor) => {
    const camposNumericos = ['precio', 'stock', 'descuento']
    setBorrador((productoActual) => ({
      ...productoActual,
      [campo]: camposNumericos.includes(campo) && valor !== '' ? Number(valor) : valor,
    }))
  }

  return (
    <Card className="overflow-hidden shadow-lg" radius="sm">
      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <h2 className="text-2xl font-black text-[#0b2b88]">PRODUCTOS PUBLICADOS</h2>
          <p className="mt-1 text-sm text-slate-500">
            Productos cargados desde tu cuenta vendedora.
          </p>
        </div>

        {puedeVerTodos && (
          <Button
            className="bg-transparent text-sm font-bold text-[#0b2b88]"
            radius="sm"
            size="sm"
            onPress={() => {
              setMostrarTodos(!mostrarTodos)
              setProductoAbierto(null)
              cancelarEdicion()
            }}
          >
            {mostrarTodos ? 'Ver menos productos' : 'Ver todos los productos'}
          </Button>
        )}
      </div>

      {(error || errorAccion) && (
        <div className="mx-8 mb-6 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {errorAccion || error}
        </div>
      )}

      <div className="grid gap-4 px-8 pb-8 xl:grid-cols-2">
        {cargando && (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-6 py-10 text-center font-semibold text-slate-500 xl:col-span-2">
            Cargando productos publicados...
          </div>
        )}

        {!cargando && productosVisibles.length === 0 && (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-6 py-10 text-center font-semibold text-slate-500 xl:col-span-2">
            Todavia no tenes productos publicados.
          </div>
        )}

        {!cargando && productosVisibles.map((producto) => {
          const estado = obtenerEstado(producto)
          const estaAbierto = productoAbierto === producto.idProducto
          const estaEditando = productoEditando === producto.idProducto
          const estaGuardando = idGuardando === producto.idProducto
          const estaEliminando = idEliminando === producto.idProducto
          const productoMostrado = estaEditando ? borrador : producto
          const estadoMostrado = obtenerEstado(productoMostrado)
          const descuentoMostrado = Number(productoMostrado.descuento)
          const hayErrores =
            estaEditando &&
            (obtenerErrorNumero(borrador.precio, 'precio') ||
              obtenerErrorNumero(borrador.stock, 'stock') ||
              obtenerErrorNumero(borrador.descuento, 'descuento'))

          return (
            <article
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
              key={producto.idProducto}
            >
              <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#061d58] text-2xl font-black text-white shadow-md">
                  {producto.imagenUrl ? (
                    <img
                      alt={producto.nombre}
                      className="h-full w-full object-cover"
                      src={producto.imagenUrl}
                    />
                  ) : (
                    producto.imagen
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-black text-[#0b2b88]">{producto.nombre}</h3>
                    <Chip className={`${coloresEstado[estado]} font-bold`} radius="full" size="sm">
                      {estado}
                    </Chip>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">#{producto.idProducto}</p>
                  <div className="mt-3">
                    <PrecioConDescuento producto={producto} compacto />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Button
                    className="bg-blue-50 text-sm font-bold text-[#0b2b88]"
                    endContent={estaAbierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    radius="sm"
                    size="sm"
                    onPress={() => cambiarProductoAbierto(producto.idProducto)}
                  >
                    Detalle
                  </Button>
                  <Button
                    isIconOnly
                    aria-label={`Desactivar ${producto.nombre}`}
                    className="bg-red-50 text-red-700"
                    isDisabled={Boolean(idGuardando) || Boolean(idEliminando)}
                    isLoading={estaEliminando}
                    radius="sm"
                    size="sm"
                    onPress={() => eliminarProducto(producto.idProducto)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>

              {estaAbierto && (
                <div className="border-t border-blue-100 bg-blue-50/50 px-5 py-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-[#0b2b88]">
                        Detalle del producto
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Estos datos se actualizan contra el backend del vendedor.
                      </p>
                    </div>

                    {estaEditando ? (
                      <div className="flex gap-2">
                        <Button
                          isIconOnly
                          isDisabled={Boolean(hayErrores) || Boolean(idEliminando)}
                          isLoading={estaGuardando}
                          aria-label="Guardar cambios"
                          className="bg-green-100 text-green-700"
                          radius="sm"
                          size="sm"
                          onPress={guardarEdicion}
                        >
                          <Check size={18} />
                        </Button>
                        <Button
                          isIconOnly
                          aria-label="Cancelar edición"
                          className="bg-slate-100 text-slate-600"
                          radius="sm"
                          size="sm"
                          onPress={cancelarEdicion}
                        >
                          <X size={18} />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        isIconOnly
                        aria-label={`Editar ${producto.nombre}`}
                        className="bg-blue-100 text-[#0b2b88]"
                        radius="sm"
                        size="sm"
                        onPress={() => iniciarEdicion(producto)}
                      >
                        <Pencil size={18} />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <CampoDetalle etiqueta="Categoría">
                      {estaEditando ? (
                        <Select
                          aria-label="Categoría del producto"
                          classNames={fieldClassNames}
                          selectedKeys={[borrador.categoria]}
                          size="sm"
                          variant="bordered"
                          onSelectionChange={(keys) =>
                            cambiarCampo('categoria', obtenerPrimerValor(keys))
                          }
                        >
                          {categoriasProducto.map((categoria) => (
                            <SelectItem key={categoria.valor}>{categoria.etiqueta}</SelectItem>
                          ))}
                        </Select>
                      ) : (
                        obtenerEtiquetaCategoria(productoMostrado.categoria)
                      )}
                    </CampoDetalle>

                    <CampoDetalle etiqueta="Precio">
                      {estaEditando ? (
                        <div className="space-y-3">
                          <Input
                            isRequired
                            aria-label="Precio del producto"
                            classNames={fieldClassNames}
                            errorMessage={obtenerErrorNumero(borrador.precio, 'precio')}
                            isInvalid={Boolean(obtenerErrorNumero(borrador.precio, 'precio'))}
                            min="0"
                            radius="sm"
                            size="sm"
                            startContent={<DollarSign className="text-slate-400" size={16} />}
                            type="number"
                            value={String(borrador.precio)}
                            variant="bordered"
                            onValueChange={(value) => cambiarCampo('precio', value)}
                          />
                          <PrecioConDescuento producto={borrador} />
                        </div>
                      ) : (
                        <PrecioConDescuento producto={productoMostrado} />
                      )}
                    </CampoDetalle>

                    <CampoDetalle etiqueta="Stock">
                      {estaEditando ? (
                        <Input
                          isRequired
                          aria-label="Stock del producto"
                          classNames={fieldClassNames}
                          errorMessage={obtenerErrorNumero(borrador.stock, 'stock')}
                          isInvalid={Boolean(obtenerErrorNumero(borrador.stock, 'stock'))}
                          min="0"
                          radius="sm"
                          size="sm"
                          type="number"
                          value={String(borrador.stock)}
                          variant="bordered"
                          onValueChange={(value) => cambiarCampo('stock', value)}
                        />
                      ) : (
                        productoMostrado.stock
                      )}
                    </CampoDetalle>

                    <CampoDetalle etiqueta="Vendidos">
                      <div>
                        <p>{productoMostrado.vendidos}</p>
                        <p className="mt-1 text-xs font-bold text-slate-400">
                          Calculado desde ventas
                        </p>
                      </div>
                    </CampoDetalle>

                    <CampoDetalle etiqueta="Descuento">
                      {estaEditando ? (
                        <div className="space-y-2">
                          <Input
                            isRequired
                            aria-label="Descuento del producto"
                            classNames={fieldClassNames}
                            endContent={<Percent className="text-green-700" size={16} />}
                            errorMessage={obtenerErrorNumero(borrador.descuento, 'descuento')}
                            isInvalid={Boolean(
                              obtenerErrorNumero(borrador.descuento, 'descuento'),
                            )}
                            max="100"
                            min="0"
                            radius="sm"
                            size="sm"
                            type="number"
                            value={String(borrador.descuento)}
                            variant="bordered"
                            onValueChange={(value) => cambiarCampo('descuento', value)}
                          />
                          {descuentoMostrado > 0 && (
                            <p className="text-xs font-bold text-red-700">
                              Precio con descuento aplicado automáticamente.
                            </p>
                          )}
                        </div>
                      ) : (
                        `${productoMostrado.descuento}%`
                      )}
                    </CampoDetalle>

                    <CampoDetalle etiqueta="Publicación">
                      {estaEditando ? (
                        <Select
                          aria-label="Estado de publicación"
                          classNames={fieldClassNames}
                          selectedKeys={[borrador.activo ? 'activa' : 'inactiva']}
                          size="sm"
                          variant="bordered"
                          onSelectionChange={(keys) =>
                            cambiarCampo('activo', obtenerPrimerValor(keys) === 'activa')
                          }
                        >
                          {estadosPublicacion.map((estadoPublicacion) => (
                            <SelectItem key={estadoPublicacion.key}>
                              {estadoPublicacion.label}
                            </SelectItem>
                          ))}
                        </Select>
                      ) : productoMostrado.activo ? (
                        'Activa'
                      ) : (
                        'Inactiva'
                      )}
                    </CampoDetalle>

                    <CampoDetalle etiqueta="Estado">
                      <Chip
                        className={`${coloresEstado[estadoMostrado]} font-bold`}
                        radius="full"
                        size="sm"
                      >
                        {estadoMostrado}
                      </Chip>
                    </CampoDetalle>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </Card>
  )
}

export default TablaProductos
