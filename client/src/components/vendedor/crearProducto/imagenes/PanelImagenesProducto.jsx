import { Card, CardBody } from '@heroui/react'
import { X } from 'lucide-react'
import FileUpload from '../../../ui/file-upload'
import { MAXIMO_IMAGENES_PRODUCTO } from '../datos/reglasCrearProducto'

const PanelImagenesProducto = ({ imagenes, onCargar, onQuitar }) => {
  const alcanzoMaximo = imagenes.length >= MAXIMO_IMAGENES_PRODUCTO

  return (
    <Card className="shadow-lg" radius="sm">
      <CardBody className="px-7 py-8">
        <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-700">
          Imágenes del producto
        </h3>
        <FileUpload
          className="mt-6"
          descripcion="PNG, JPG o WEBP. Maximo 5 imágenes de 5MB."
          deshabilitado={alcanzoMaximo}
          titulo={alcanzoMaximo ? 'Máximo alcanzado' : 'Subir imágenes'}
          onChange={onCargar}
        />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {imagenes.map((imagen) => (
            <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white" key={imagen.id}>
              <img alt={imagen.nombre} className="h-36 w-full object-contain" src={imagen.url} />
              <button className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-700 shadow" type="button" onClick={() => onQuitar(imagen.id)}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default PanelImagenesProducto
