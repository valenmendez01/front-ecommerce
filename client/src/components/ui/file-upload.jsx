import { Upload } from 'lucide-react'
import { motion } from 'motion/react'
import { useDropzone } from 'react-dropzone'
import { cn } from '../../lib/utils'

const variantesSubida = {
  initial: { x: 0, y: 0 },
  animate: { x: 18, y: -18, opacity: 0.9 },
}

const tiposImagen = {
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
}

const FileUpload = ({
  className,
  descripcion = 'Arrastra o selecciona archivos para subirlos.',
  deshabilitado = false,
  multiple = true,
  onChange,
  titulo = 'Subir archivo',
}) => {
  const cargarArchivos = (archivos) => {
    if (archivos.length > 0) onChange?.(archivos)
  }

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    accept: tiposImagen,
    disabled: deshabilitado,
    multiple,
    noClick: true,
    onDrop: cargarArchivos,
  })

  return (
    <div className={cn('w-full', className)} {...getRootProps()}>
      <input {...getInputProps()} />
      <motion.button
        className={cn(
          'group/file relative block w-full overflow-hidden rounded-lg border border-dorado-primary/35 bg-white p-6 text-center',
          deshabilitado ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        )}
        disabled={deshabilitado}
        type="button"
        whileHover={deshabilitado ? undefined : 'animate'}
        onClick={open}
      >
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="relative z-20 flex flex-col items-center">
          <p className="text-xl font-black text-green-primary">
            {isDragActive ? 'Solta las imagenes' : titulo}
          </p>
          <p className="mt-2 max-w-sm text-sm text-slate-500">{descripcion}</p>
          <div className="relative mt-7 h-28 w-28">
            <motion.span
              className="absolute inset-0 z-20 flex items-center justify-center rounded-md bg-white text-green-primary shadow-[0_10px_45px_rgba(20,43,16,0.18)]"
              transition={{ damping: 20, stiffness: 300, type: 'spring' }}
              variants={variantesSubida}
            >
              <Upload size={30} strokeWidth={2.5} />
            </motion.span>
            <motion.span
              className="absolute inset-0 rounded-md border border-dashed border-dorado-primary bg-transparent opacity-0"
              variants={{ animate: { opacity: 1 }, initial: { opacity: 0 } }}
            />
          </div>
        </div>
      </motion.button>
    </div>
  )
}

const GridPattern = () => (
  <div className="flex h-full scale-105 flex-wrap items-center justify-center gap-px bg-dorado-primary/10">
    {Array.from({ length: 96 }).map((_, index) => (
      <span
        className={cn('h-9 w-9 shrink-0 rounded-[2px]', index % 2 === 0 ? 'bg-white' : 'bg-dorado-primary/10')}
        key={index}
      />
    ))}
  </div>
)

export default FileUpload
