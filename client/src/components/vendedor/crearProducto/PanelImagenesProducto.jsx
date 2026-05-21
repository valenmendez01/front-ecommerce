import { Card, CardBody } from '@heroui/react'
import { ImagePlus, UploadCloud, X } from 'lucide-react'

const InputImagenes = ({ children, className, onCargar }) => (
  <label className={className}>
    {children}
    <input
      multiple
      accept="image/png,image/jpeg,image/webp"
      className="hidden"
      type="file"
      onChange={onCargar}
    />
  </label>
)

const PanelImagenesProducto = ({ imagenes, onCargar, onQuitar }) => (
  <Card className="shadow-lg" radius="sm">
    <CardBody className="px-7 py-8">
      <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-700">
        Imagenes del producto
      </h3>
      <InputImagenes
        className="mt-6 flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-[#0b2b88] hover:bg-blue-50"
        onCargar={onCargar}
      >
        <UploadCloud className="text-[#0b2b88]" size={42} strokeWidth={2.5} />
        <span className="mt-4 text-xl font-black text-slate-950">Subir imagenes</span>
        <span className="mt-2 text-sm text-slate-500">PNG, JPG o WEBP. Maximo 5MB.</span>
      </InputImagenes>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {imagenes.map((imagen) => (
          <div className="relative overflow-hidden rounded-md border border-slate-200 bg-white" key={imagen.id}>
            <img alt={imagen.nombre} className="h-28 w-full object-contain" src={imagen.url} />
            <button className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-700 shadow" type="button" onClick={() => onQuitar(imagen.id)}>
              <X size={16} />
            </button>
          </div>
        ))}
        <InputImagenes
          className="flex h-28 cursor-pointer items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-100 text-slate-500"
          onCargar={onCargar}
        >
          <ImagePlus size={28} />
        </InputImagenes>
      </div>
    </CardBody>
  </Card>
)

export default PanelImagenesProducto
