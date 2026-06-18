import PaginaPanelUsuario from '../components/panelUsuario/estructura/PaginaPanelUsuario'
import EncabezadoCrearProducto from '../components/vendedor/crearProducto/encabezado/EncabezadoCrearProducto'
import FormularioCrearProducto from '../components/vendedor/crearProducto/formulario/FormularioCrearProducto'
import { calcularPrecioFinal } from '../components/vendedor/crearProducto/datos/reglasCrearProducto'
import { useFormularioCrearProducto } from '../components/vendedor/crearProducto/hooks/useFormularioCrearProducto'
import { useOpcionesCrearProducto } from '../components/vendedor/crearProducto/hooks/useOpcionesCrearProducto'

const CrearProducto = ({ token, usuario, onCerrarSesion }) => {
  const { categorias, selecciones } = useOpcionesCrearProducto()
  const formulario = useFormularioCrearProducto({ categorias, selecciones, token, usuario })

  return (
    <PaginaPanelUsuario usuario={usuario} onCerrarSesion={onCerrarSesion}>
      <EncabezadoCrearProducto />
      <FormularioCrearProducto
        {...formulario}
        categorias={categorias}
        onCambiar={formulario.cambiarCampo}
        onCargarImagenes={formulario.cargarImagenes}
        onPublicar={formulario.publicarProducto}
        onQuitarImagen={formulario.quitarImagen}
        precioFinal={calcularPrecioFinal(formulario.producto.precio, formulario.producto.descuento)}
        selecciones={selecciones}
      />
    </PaginaPanelUsuario>
  )
}

export default CrearProducto
