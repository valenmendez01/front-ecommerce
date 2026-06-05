import { Package, PackageCheck, PackageX, TriangleAlert } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetricasPanelVendedor from '../metricas/MetricasPanelVendedor'
import TablaProductos from './TablaProductos'
import { agregarDatosDeVentas, crearDatosProducto, normalizarProductoVendedor, obtenerProductosPagina } from '../datos/datosProductosPanel'
import { obtenerVentasPaginaPanel } from '../datos/datosVentasPanel'
import { guardarImagenesProducto } from '../../productos/imagenes/imagenesProductoDetalle'
import {
  actualizarProductoVendedorGuardado,
  fetchProductoVendedorPorId,
  fetchProductosVendedor,
} from '../../../../redux/productosVendedorSlice'
import { fetchVentasVendedor } from '../../../../redux/ventasSlice'

const ProductosPanelVendedor = ({ token }) => {
  const dispatch = useDispatch()
  const {
    productos: productosOriginales,
    loading: cargandoProductos,
    error: errorProductos,
  } = useSelector((state) => state.productosVendedor)
  const {
    ventas: ventasOriginales,
    loading: cargandoVentas,
    error: errorVentas,
  } = useSelector((state) => state.ventas)

  useEffect(() => {
    dispatch(fetchProductosVendedor(token))
    dispatch(fetchVentasVendedor(token))
  }, [dispatch, token])

  const productos = obtenerProductosPagina(productosOriginales).map(normalizarProductoVendedor)
  const ventas = obtenerVentasPaginaPanel(ventasOriginales)
  const cargando = cargandoProductos || cargandoVentas
  const error = errorProductos || errorVentas || ''

  const actualizarProducto = async (producto, cambiosImagenes) => {
    const respuesta = await fetch(`/productos/${producto.idProducto}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(crearDatosProducto(producto)),
    })
    const json = await respuesta.json()
    if (!respuesta.ok) throw new Error(json.mensaje || json.message || 'No se pudo actualizar el producto.')
    const resultadoImagenes = await guardarImagenesProducto(producto.idProducto, cambiosImagenes, token)
    const productoGuardado = resultadoImagenes
      ? await dispatch(fetchProductoVendedorPorId({ idProducto: producto.idProducto, token })).unwrap()
      : json.data
    const guardado = normalizarProductoVendedor(productoGuardado)
    if (!resultadoImagenes) dispatch(actualizarProductoVendedorGuardado(productoGuardado))
    return {
      mensaje: json.mensaje || json.message || resultadoImagenes?.mensaje || 'Producto actualizado correctamente',
      mensajeImagenes: resultadoImagenes?.mensaje,
      producto: guardado,
    }
  }

  const cambiarVisibilidadProducto = (producto) =>
    actualizarProducto({ ...producto, activo: !producto.activo })

  const productosConVentas = productos.map((producto) => agregarDatosDeVentas(producto, ventas))
  const activos = productosConVentas.filter((producto) => producto.activo)
  const metricas = [
    { titulo: 'Productos publicados', valor: productos.length, descripcion: 'Total de productos cargados', Icono: Package, destacar: true },
    { titulo: 'Productos activos', valor: activos.length, descripcion: 'Publicados aunque alguno no tenga stock', Icono: PackageCheck },
    { titulo: 'Stock bajo', valor: activos.filter((producto) => producto.stock > 0 && producto.stock <= 5).length, descripcion: 'Productos activos con 1 a 5 unidades', Icono: TriangleAlert },
    { titulo: 'Sin stock', valor: activos.filter((producto) => producto.stock === 0).length, descripcion: 'Productos activos sin unidades', Icono: PackageX },
  ]

  return <>
    <MetricasPanelVendedor cargando={cargando} metricas={metricas} />
    <div className="mt-12"><TablaProductos cargando={cargando} error={error} productos={productosConVentas} onActualizarProducto={actualizarProducto} onCambiarVisibilidadProducto={cambiarVisibilidadProducto} /></div>
  </>
}

export default ProductosPanelVendedor
