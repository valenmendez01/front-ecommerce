import { ImagePlus, X } from 'lucide-react'
import { obtenerUrlImagenProducto } from '../../../data/productosVendedor'
import { MAXIMO_IMAGENES_PRODUCTO } from '../../../data/reglasImagenesProducto'

const EntradaImagen = ({ deshabilitada, onCargar }) => (
  <label className={`flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-dorado-primary/60 bg-white text-sm font-bold text-green-primary ${deshabilitada ? 'cursor-not-allowed opacity-50' : 'hover:bg-dorado-primary/10'}`}>
    <ImagePlus size={24} />
    <span className="mt-2">Agregar imagen</span>
    <input
      multiple
      accept="image/png,image/jpeg,image/webp"
      className="hidden"
      disabled={deshabilitada}
      type="file"
      onChange={onCargar}
    />
  </label>
)

const ImagenDetalle = ({ nombre, onQuitar, url }) => (
  <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white">
    <img alt={nombre} className="h-36 w-full bg-white object-contain p-2" src={url} />
    {onQuitar && (
      <button
        aria-label={`Quitar ${nombre}`}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-700 shadow"
        type="button"
        onClick={onQuitar}
      >
        <X size={16} />
      </button>
    )}
  </div>
)

const ImagenesDetalleProducto = ({
  editando,
  error,
  imagenes,
  imagenesNuevas,
  imagenesQuitadas,
  onCargar,
  onQuitarActual,
  onQuitarNueva,
}) => {
  const guardadas = (imagenes || []).filter(Boolean).filter((imagen) => !imagenesQuitadas.includes(imagen.idImagen))
  const cantidad = guardadas.length + imagenesNuevas.length
  const alcanzoMaximo = cantidad >= MAXIMO_IMAGENES_PRODUCTO

  return (
    <section className="mt-5 rounded-lg border border-dorado-primary/35 bg-white/90 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-black uppercase tracking-widest text-green-primary">Imagenes</h4>
        <p className="text-xs font-bold text-slate-500">{cantidad}/{MAXIMO_IMAGENES_PRODUCTO}</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {guardadas.map((imagen) => (
          <ImagenDetalle
            key={imagen.idImagen}
            nombre="Imagen del producto"
            onQuitar={editando ? () => onQuitarActual(imagen.idImagen) : null}
            url={obtenerUrlImagenProducto(imagen)}
          />
        ))}
        {imagenesNuevas.map((imagen) => (
          <ImagenDetalle key={imagen.id} nombre={imagen.nombre} onQuitar={() => onQuitarNueva(imagen.id)} url={imagen.url} />
        ))}
        {editando && <EntradaImagen deshabilitada={alcanzoMaximo} onCargar={onCargar} />}
      </div>
      {!editando && cantidad === 0 && <p className="mt-3 text-sm font-semibold text-slate-500">Este producto no tiene imagenes.</p>}
      {error && <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</p>}
    </section>
  )
}

export default ImagenesDetalleProducto
