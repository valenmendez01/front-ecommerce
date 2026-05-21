import { Button, Card, CardBody, Chip } from '@heroui/react'
import {
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  ImagePlus,
  Info,
  UploadCloud,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import BarraSuperior from '../components/layout/BarraSuperior'
import Footer from '../components/layout/Footer'
import MenuLateral from '../components/layout/MenuLateral'
import { obtenerErrorCantidadImagenesProducto } from '../data/reglasImagenesProducto'
import { apiRequest } from '../lib/api'

const estadoInicial = {
  nombre: '',
  description: '',
  categoria: 'FIGURITAS',
  stock: 0,
  precio: '',
  descuento: 0,
}

const formatearPesos = (monto) => `$${monto.toLocaleString('es-AR')}`
const calcularPrecioFinal = (precio, descuento) => Math.round(precio * (1 - descuento / 100))

const inputClasses =
  'w-full rounded-md border border-slate-200 bg-slate-100 px-5 py-4 text-base font-semibold text-slate-800 outline-none transition focus:border-[#0b2b88] focus:bg-white'

const errorClasses = 'mt-2 text-sm font-semibold text-red-700'

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

const obtenerErroresProducto = (producto, categoriasProducto = []) => {
  const precio = Number(producto.precio)
  const stock = Number(producto.stock)
  const descuento = Number(producto.descuento)
  const valoresCategoriasProducto = categoriasProducto.map((categoria) => categoria.valor)

  return {
    nombre: producto.nombre.trim() ? '' : 'El nombre es obligatorio.',
    description: producto.description.trim() ? '' : 'La descripcion es obligatoria.',
    categoria: valoresCategoriasProducto.includes(producto.categoria)
      ? ''
      : 'Selecciona una categoria valida.',
    stock:
      producto.stock !== '' && !Number.isNaN(stock) && stock >= 0
        ? ''
        : 'El stock debe ser 0 o mayor.',
    precio:
      producto.precio !== '' && !Number.isNaN(precio) && precio > 0
        ? ''
        : 'El precio debe ser mayor a 0.',
    descuento:
      producto.descuento !== '' && !Number.isNaN(descuento) && descuento >= 0 && descuento <= 100
        ? ''
        : 'El descuento debe estar entre 0 y 100.',
  }
}

const CrearProducto = ({ usuario, onCerrarSesion, onVolverPanel, onPublicarProducto }) => {
  const [producto, setProducto] = useState(estadoInicial)
  const [imagenes, setImagenes] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('exito')
  const [mostrarErrores, setMostrarErrores] = useState(false)
  const [publicando, setPublicando] = useState(false)
  const [categoriasProducto, setCategoriasProducto] = useState([])

  useEffect(() => {
    let sigueActivo = true

    apiRequest('/categorias', { auth: false })
      .then((categorias) => {
        if (!sigueActivo) return

        const categoriasNormalizadas = normalizarCategorias(categorias)
        setCategoriasProducto(categoriasNormalizadas)

        if (categoriasNormalizadas.length > 0) {
          setProducto((productoActual) => {
            const categoriaActualExiste = categoriasNormalizadas.some(
              (categoria) => categoria.valor === productoActual.categoria,
            )

            return categoriaActualExiste
              ? productoActual
              : { ...productoActual, categoria: categoriasNormalizadas[0].valor }
          })
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

  const precio = Number(producto.precio)
  const descuento = Number(producto.descuento)
  const precioFinal = calcularPrecioFinal(precio, descuento)
  const tieneDescuento = descuento > 0
  const erroresProducto = obtenerErroresProducto(producto, categoriasProducto)
  const errorImagenes = obtenerErrorCantidadImagenesProducto(imagenes.length)
  const puedePublicar = Object.values(erroresProducto).every((error) => !error) && !errorImagenes
  const mostrarError = (campo) => mostrarErrores && erroresProducto[campo]

  const cambiarCampo = (campo, valor) => {
    const camposNumericos = ['stock', 'precio', 'descuento']
    setProducto((productoActual) => ({
      ...productoActual,
      [campo]: camposNumericos.includes(campo) && valor !== '' ? Number(valor) : valor,
    }))
    setMensaje('')
  }

  const cargarImagenes = (event) => {
    const archivos = Array.from(event.target.files || [])
    const nuevasImagenes = archivos.map((archivo, indice) => ({
      archivo,
      id: `${archivo.name}-${archivo.lastModified}-${archivo.size}-${imagenes.length + indice}`,
      nombre: archivo.name,
      url: URL.createObjectURL(archivo),
    }))

    setImagenes((imagenesActuales) => [...imagenesActuales, ...nuevasImagenes])
    setMensaje('')
    event.target.value = ''
  }

  const quitarImagen = (idImagen) => {
    setImagenes((imagenesActuales) => {
      const imagenEliminada = imagenesActuales.find((imagen) => imagen.id === idImagen)

      if (imagenEliminada) {
        URL.revokeObjectURL(imagenEliminada.url)
      }

      return imagenesActuales.filter((imagen) => imagen.id !== idImagen)
    })
  }

  const liberarImagenes = () => {
    imagenes.forEach((imagen) => URL.revokeObjectURL(imagen.url))
  }

  const publicarProducto = async () => {
    setMostrarErrores(true)

    if (!puedePublicar) {
      setTipoMensaje('error')
      setMensaje('Revisa los campos obligatorios antes de publicar el producto.')
      return
    }

    setPublicando(true)
    setMensaje('')

    try {
      await onPublicarProducto({
        ...producto,
        imagenes: imagenes.map((imagen) => imagen.archivo),
      })

      liberarImagenes()
      setProducto(estadoInicial)
      setImagenes([])
      setMostrarErrores(false)
      setTipoMensaje('exito')
      setMensaje('Producto publicado correctamente con datos del backend.')
    } catch (error) {
      setTipoMensaje('error')
      setMensaje(error.message || 'No se pudo publicar el producto.')
    } finally {
      setPublicando(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <BarraSuperior />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <MenuLateral usuario={usuario} onCerrarSesion={onCerrarSesion} />

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-8 py-10">
            <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Button
                  className="mb-6 bg-white text-[#0b2b88] shadow-sm"
                  radius="sm"
                  startContent={<ArrowLeft size={18} />}
                  onPress={onVolverPanel}
                >
                  Volver al panel
                </Button>
                <h2 className="text-6xl font-black uppercase leading-none text-[#061d58] md:text-7xl">
                  Crear
                  <br />
                  producto
                </h2>
                <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-700">
                  Carga la informacion principal, defini stock, precio, descuento e imagenes.
                </p>
              </div>

              <Chip className="w-fit bg-green-100 px-5 py-4 font-bold text-green-700" radius="sm">
                Producto activo al publicar
              </Chip>
            </section>

            <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_380px]">
              <div className="space-y-8">
                <Card className="shadow-lg" radius="sm">
                  <CardBody className="px-8 py-8">
                    <div className="mb-7 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-white">
                        <Info size={18} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-950">Informacion principal</h3>
                    </div>

                    <div className="space-y-6">
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Nombre del producto
                        </span>
                        <input
                          className={`${inputClasses} mt-2`}
                          placeholder="Nombre del producto"
                          value={producto.nombre}
                          onChange={(event) => cambiarCampo('nombre', event.target.value)}
                        />
                        {mostrarError('nombre') && (
                          <p className={errorClasses}>{erroresProducto.nombre}</p>
                        )}
                      </label>

                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Descripcion
                        </span>
                        <textarea
                          className={`${inputClasses} mt-2 min-h-40 resize-y`}
                          placeholder="Describi el producto, su estado y sus caracteristicas principales..."
                          value={producto.description}
                          onChange={(event) => cambiarCampo('description', event.target.value)}
                        />
                        {mostrarError('description') && (
                          <p className={errorClasses}>{erroresProducto.description}</p>
                        )}
                      </label>

                      <div className="grid gap-6 md:grid-cols-2">
                        <label className="block">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Categoria
                          </span>
                          <select
                            className={`${inputClasses} mt-2`}
                            value={producto.categoria}
                            onChange={(event) => cambiarCampo('categoria', event.target.value)}
                          >
                            {categoriasProducto.map((categoria) => (
                              <option key={categoria.valor} value={categoria.valor}>
                                {categoria.etiqueta}
                              </option>
                            ))}
                          </select>
                          {mostrarError('categoria') && (
                            <p className={errorClasses}>{erroresProducto.categoria}</p>
                          )}
                        </label>

                        <label className="block">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Stock disponible
                          </span>
                          <input
                            className={`${inputClasses} mt-2`}
                            min="0"
                            type="number"
                            value={producto.stock}
                            onChange={(event) => cambiarCampo('stock', event.target.value)}
                          />
                          {mostrarError('stock') && (
                            <p className={errorClasses}>{erroresProducto.stock}</p>
                          )}
                        </label>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card className="shadow-lg" radius="sm">
                  <CardBody className="px-8 py-8">
                    <div className="mb-7 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-white">
                        <DollarSign size={18} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-950">Precio y descuento</h3>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Precio base
                        </span>
                        <input
                          className={`${inputClasses} mt-2`}
                          min="0"
                          placeholder="Precio base"
                          type="number"
                          value={producto.precio}
                          onChange={(event) => cambiarCampo('precio', event.target.value)}
                        />
                        {mostrarError('precio') && (
                          <p className={errorClasses}>{erroresProducto.precio}</p>
                        )}
                      </label>

                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Descuento (%)
                        </span>
                        <input
                          className={`${inputClasses} mt-2`}
                          max="100"
                          min="0"
                          type="number"
                          value={producto.descuento}
                          onChange={(event) => cambiarCampo('descuento', event.target.value)}
                        />
                        {mostrarError('descuento') && (
                          <p className={errorClasses}>{erroresProducto.descuento}</p>
                        )}
                      </label>
                    </div>

                    <div className="mt-6 rounded-md bg-slate-100 p-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Vista previa del precio
                      </p>
                      {tieneDescuento ? (
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <span className="text-lg font-bold text-slate-400 line-through">
                            {formatearPesos(precio)}
                          </span>
                          <span className="text-2xl font-black text-red-700">
                            {formatearPesos(precioFinal)}
                          </span>
                        </div>
                      ) : (
                        <p className="mt-2 text-2xl font-black text-[#0b2b88]">
                          {formatearPesos(precio)}
                        </p>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>

              <aside className="space-y-8">
                <Card className="shadow-lg" radius="sm">
                  <CardBody className="px-7 py-8">
                    <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-700">
                      Imagenes del producto
                    </h3>

                    <label className="mt-6 flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-[#0b2b88] hover:bg-blue-50">
                      <UploadCloud className="text-[#0b2b88]" size={42} strokeWidth={2.5} />
                      <span className="mt-4 text-xl font-black text-slate-950">
                        Subir imagenes
                      </span>
                      <span className="mt-2 text-sm text-slate-500">
                        PNG, JPG o WEBP. Maximo 5MB.
                      </span>
                      <input
                        multiple
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        type="file"
                        onChange={cargarImagenes}
                      />
                    </label>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {imagenes.map((imagen) => (
                        <div
                          className="relative overflow-hidden rounded-md border border-slate-200"
                          key={imagen.id}
                        >
                          <img
                            alt={imagen.nombre}
                            className="h-28 w-full object-cover"
                            src={imagen.url}
                          />
                          <button
                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-700 shadow"
                            type="button"
                            onClick={() => quitarImagen(imagen.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}

                      <label className="flex h-28 cursor-pointer items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-100 text-slate-500">
                        <ImagePlus size={28} />
                        <input
                          multiple
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          type="file"
                          onChange={cargarImagenes}
                        />
                      </label>
                    </div>
                  </CardBody>
                </Card>

                <Button
                  className="w-full bg-green-600 py-8 text-2xl font-black italic text-white shadow-xl"
                  isDisabled={publicando}
                  isLoading={publicando}
                  radius="sm"
                  startContent={!publicando && <CheckCircle2 size={28} strokeWidth={2.5} />}
                  onPress={publicarProducto}
                >
                  Publicar producto
                </Button>

                {mensaje && (
                  <Card
                    className={`border bg-white shadow-md ${
                      tipoMensaje === 'error' ? 'border-red-100' : 'border-green-100'
                    }`}
                    radius="sm"
                  >
                    <CardBody
                      className={`text-sm font-bold ${
                        tipoMensaje === 'error' ? 'text-red-700' : 'text-green-700'
                      }`}
                    >
                      {mensaje}
                    </CardBody>
                  </Card>
                )}
              </aside>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default CrearProducto
