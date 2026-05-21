import { Button, Card, Chip, Input, Select, SelectItem } from '@heroui/react'
import {
  Check,
  ChevronDown,
  ChevronUp,
  DollarSign,
  ImageOff,
  ImagePlus,
  Percent,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'
import {
  MAXIMO_IMAGENES_PRODUCTO,
  MINIMO_IMAGENES_PRODUCTO,
  obtenerErrorCantidadImagenesProducto,
} from '../../data/reglasImagenesProducto'
import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api'

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

const formatearEtiquetaCategoria = (categoria = '') =>
  categoria
    .toString()
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letra) => letra.toUpperCase())

const normalizarCategorias = (categorias) =>
  (Array.isArray(categorias) ? categorias : []).map((categoria) => ({
    valor: categoria,
    etiqueta: formatearEtiquetaCategoria(categoria),
  }))

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

const TablaProductos = ({
  cargando = false,
  error = '',
  productos,
  onAgregarImagenesProducto,
  onActualizarProducto,
  onEliminarImagenProducto,
  onEliminarProducto,
}) => {
  const [mostrarTodos, setMostrarTodos] = useState(false)
  const [productoAbierto, setProductoAbierto] = useState(null)
  const [productoEditando, setProductoEditando] = useState(null)
  const [borrador, setBorrador] = useState(null)
  const [idGuardando, setIdGuardando] = useState(null)
  const [idEliminando, setIdEliminando] = useState(null)
  const [idSubiendoImagenes, setIdSubiendoImagenes] = useState(null)
  const [idImagenEliminando, setIdImagenEliminando] = useState(null)
  const [errorAccion, setErrorAccion] = useState('')
  const [categoriasProducto, setCategoriasProducto] = useState([])
  const productosVisibles = mostrarTodos ? productos : productos.slice(0, 2)
  const puedeVerTodos = productos.length > 2

  useEffect(() => {
    let sigueActivo = true

    apiRequest('/categorias', { auth: false })
      .then((categorias) => {
        if (sigueActivo) {
          setCategoriasProducto(normalizarCategorias(categorias))
        }
      })
      .catch(() => {
        if (sigueActivo) {
          setCategoriasProducto([])
        }
      })

    return () => {
      sigueActivo = false
    }
  }, [])

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
    const errorImagenes = obtenerErrorCantidadImagenesProducto(borrador.imagenes?.length || 0)

    if (tieneErrores || errorImagenes) {
      if (errorImagenes) {
        setErrorAccion(errorImagenes)
      }
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

  const sincronizarImagenesEditadas = (productoActualizado) => {
    if (!productoActualizado) {
      return
    }

    setBorrador((productoActual) => {
      if (!productoActual || productoActual.idProducto !== productoActualizado.idProducto) {
        return productoActual
      }

      return {
        ...productoActual,
        imagen: productoActualizado.imagen,
        imagenes: productoActualizado.imagenes,
        imagenUrl: productoActualizado.imagenUrl,
      }
    })
  }

  const agregarImagenes = async (producto, event) => {
    const archivos = Array.from(event.target.files || [])
    event.target.value = ''

    if (!archivos.length) {
      return
    }

    const imagenesActuales =
      borrador?.idProducto === producto.idProducto ? borrador.imagenes || [] : producto.imagenes || []
    const espaciosDisponibles = MAXIMO_IMAGENES_PRODUCTO - imagenesActuales.length

    if (espaciosDisponibles <= 0) {
      setErrorAccion(`Solo podes cargar hasta ${MAXIMO_IMAGENES_PRODUCTO} imagenes por producto.`)
      return
    }

    const archivosPermitidos = archivos.slice(0, espaciosDisponibles)

    setIdSubiendoImagenes(producto.idProducto)
    setErrorAccion('')

    try {
      const productoActualizado = await onAgregarImagenesProducto(producto.idProducto, archivosPermitidos)
      sincronizarImagenesEditadas(productoActualizado)

      if (archivos.length > espaciosDisponibles) {
        setErrorAccion(
          `Se agregaron ${archivosPermitidos.length} imagenes. El maximo es ${MAXIMO_IMAGENES_PRODUCTO}.`,
        )
      }
    } catch (errorAgregarImagenes) {
      setErrorAccion(errorAgregarImagenes.message || 'No se pudieron agregar las imagenes.')
    } finally {
      setIdSubiendoImagenes(null)
    }
  }

  const eliminarImagen = async (producto, idImagen) => {
    if (!idImagen) {
      return
    }

    const imagenesActuales =
      borrador?.idProducto === producto.idProducto ? borrador.imagenes || [] : producto.imagenes || []

    if (imagenesActuales.length <= MINIMO_IMAGENES_PRODUCTO) {
      setErrorAccion(`El producto debe tener al menos ${MINIMO_IMAGENES_PRODUCTO} imagen.`)
      return
    }

    setIdImagenEliminando(idImagen)
    setErrorAccion('')

    try {
      const productoActualizado = await onEliminarImagenProducto(producto.idProducto, idImagen)
      sincronizarImagenesEditadas(productoActualizado)
    } catch (errorEliminarImagen) {
      setErrorAccion(errorEliminarImagen.message || 'No se pudo eliminar la imagen.')
    } finally {
      setIdImagenEliminando(null)
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
          const imagenesProducto = productoMostrado.imagenes || []
          const estaSubiendoImagenes = idSubiendoImagenes === producto.idProducto
          const errorImagenesProducto = estaEditando
            ? obtenerErrorCantidadImagenesProducto(imagenesProducto.length)
            : ''
          const alcanzoMaximoImagenesProducto =
            imagenesProducto.length >= MAXIMO_IMAGENES_PRODUCTO
          const hayErrores =
            estaEditando &&
            (obtenerErrorNumero(borrador.precio, 'precio') ||
              obtenerErrorNumero(borrador.stock, 'stock') ||
              obtenerErrorNumero(borrador.descuento, 'descuento') ||
              errorImagenesProducto)

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
                        formatearEtiquetaCategoria(productoMostrado.categoria)
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

                  <div className="mt-5 rounded-md border border-blue-100 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-[#0b2b88]">
                          Imagenes del producto
                        </h4>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                          {estaEditando
                            ? 'Agrega nuevas imagenes o elimina archivos cargados.'
                            : 'Archivos cargados actualmente en el producto.'}
                        </p>
                      </div>
                      <Chip className="bg-blue-50 font-bold text-[#0b2b88]" radius="full" size="sm">
                        {imagenesProducto.length}/{MAXIMO_IMAGENES_PRODUCTO} archivo
                        {imagenesProducto.length === 1 ? '' : 's'}
                      </Chip>
                    </div>

                    {estaEditando && errorImagenesProducto && (
                      <div className="mt-4 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                        {errorImagenesProducto}
                      </div>
                    )}

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {imagenesProducto.map((imagen, indice) => (
                        <div
                          className="group flex min-w-0 gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50/40"
                          key={imagen.idImagen || `${producto.idProducto}-${indice}`}
                        >
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white">
                            {imagen.src ? (
                              <img
                                alt={imagen.nombre}
                                className="h-full w-full object-contain p-1"
                                src={imagen.src}
                              />
                            ) : (
                              <ImageOff className="text-slate-400" size={26} />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-black text-[#0b2b88]">
                              {imagen.nombre || `Imagen ${indice + 1}`}
                            </p>
                            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                              {(imagen.tipo || 'image').replace('image/', '').toUpperCase()}
                              {imagen.idImagen ? ` - ID ${imagen.idImagen}` : ''}
                            </p>
                            <p className="mt-2 text-xs font-semibold text-slate-500">
                              Vista completa sin recorte.
                            </p>
                          </div>

                          {estaEditando && (
                            <Button
                              isIconOnly
                              aria-label={`Eliminar ${imagen.nombre || `imagen ${indice + 1}`}`}
                              className="shrink-0 bg-red-50 text-red-700"
                              isDisabled={
                                estaSubiendoImagenes ||
                                !imagen.idImagen ||
                                imagenesProducto.length <= MINIMO_IMAGENES_PRODUCTO
                              }
                              isLoading={idImagenEliminando === imagen.idImagen}
                              radius="sm"
                              size="sm"
                              onPress={() => eliminarImagen(producto, imagen.idImagen)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      ))}

                      {!imagenesProducto.length && !estaEditando && (
                        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm font-bold text-slate-500 sm:col-span-2">
                          Este producto todavia no tiene imagenes cargadas.
                        </div>
                      )}

                      {estaEditando && (
                        <label
                          className={`flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[#0b2b88] bg-blue-50/70 px-4 py-5 text-center text-[#0b2b88] transition hover:bg-blue-100 ${
                            estaSubiendoImagenes || alcanzoMaximoImagenesProducto
                              ? 'pointer-events-none opacity-70'
                              : ''
                          }`}
                        >
                          <ImagePlus size={26} strokeWidth={2.5} />
                          <span className="mt-2 text-sm font-black">
                            {estaSubiendoImagenes
                              ? 'Subiendo imagenes...'
                              : alcanzoMaximoImagenesProducto
                                ? 'Maximo alcanzado'
                                : 'Agregar imagenes'}
                          </span>
                          <span className="mt-1 text-xs font-semibold text-slate-500">
                            PNG, JPG o WEBP. Entre 1 y {MAXIMO_IMAGENES_PRODUCTO}.
                          </span>
                          <input
                            multiple
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            disabled={estaSubiendoImagenes || alcanzoMaximoImagenesProducto}
                            type="file"
                            onChange={(event) => agregarImagenes(producto, event)}
                          />
                        </label>
                      )}
                    </div>
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
