import AccionesCrearProducto from './AccionesCrearProducto'
import PanelImagenesProducto from './PanelImagenesProducto'
import SeccionInformacionProducto from './SeccionInformacionProducto'
import SeccionPrecioProducto from './SeccionPrecioProducto'

const FormularioCrearProducto = ({
  categorias,
  errores,
  imagenes,
  mensaje,
  mostrarErrores,
  onCambiar,
  onCargarImagenes,
  onPublicar,
  onQuitarImagen,
  precioFinal,
  producto,
  publicando,
  selecciones,
  tipoMensaje,
}) => (
  <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_440px]">
    <div className="space-y-8">
      <SeccionInformacionProducto categorias={categorias} errores={errores} mostrarErrores={mostrarErrores} onCambiar={onCambiar} producto={producto} selecciones={selecciones} />
      <SeccionPrecioProducto errores={errores} mostrarErrores={mostrarErrores} onCambiar={onCambiar} precioFinal={precioFinal} producto={producto} />
    </div>
    <aside className="space-y-8">
      <PanelImagenesProducto imagenes={imagenes} onCargar={onCargarImagenes} onQuitar={onQuitarImagen} />
      <AccionesCrearProducto mensaje={mensaje} onPublicar={onPublicar} publicando={publicando} tipoMensaje={tipoMensaje} />
    </aside>
  </div>
)

export default FormularioCrearProducto
