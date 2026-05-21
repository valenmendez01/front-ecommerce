import { Button, Chip } from '@heroui/react'
import { ArrowLeft } from 'lucide-react'

const EncabezadoCrearProducto = ({ onVolverPanel }) => (
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
)

export default EncabezadoCrearProducto
