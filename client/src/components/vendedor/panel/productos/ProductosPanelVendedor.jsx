import { Package, PackageCheck, PackageX, TriangleAlert } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearErrorDesdeAccion } from '../../../../lib/resultadoThunk'
import MetricasPanelVendedor from '../metricas/MetricasPanelVendedor'
import TablaProductos from './TablaProductos'
import { normalizarProductoVendedor, obtenerProductosPagina } from '../datos/datosProductosPanel'
import {
  actualizarProductoVendedor,
  fetchProductosVendedor,
  guardarImagenesProductoVendedor,
} from '../../../../redux/productosVendedorSlice'

const tieneCambiosImagenes = (cambiosImagenes) =>
  Boolean(cambiosImagenes?.nuevas?.length || cambiosImagenes?.quitadas?.length)

const ProductosPanelVendedor = ({ token, usuarioId }) => {
  const dispatch = useDispatch()
  const {
    productos: productosOriginales,
    loading: cargando,
    error,
  } = useSelector((state) => state.productosVendedor)

  useEffect(() => {
    dispatch(fetchProductosVendedor({ token, usuarioId }))
  }, [dispatch, token, usuarioId])

  const productos = obtenerProductosPagina(productosOriginales).map(normalizarProductoVendedor)

  const actualizarProducto = async (producto, cambiosImagenes) => {
    const accionProducto = await dispatch(
      actualizarProductoVendedor({ producto, token })
    )
    if (actualizarProductoVendedor.rejected.match(accionProducto)) {
      throw crearErrorDesdeAccion(accionProducto, 'No se pudo actualizar el producto.')
    }
    const resultadoProducto = accionProducto.payload

    let resultadoImagenes = null
    if (tieneCambiosImagenes(cambiosImagenes)) {
      const accionImagenes = await dispatch(
        guardarImagenesProductoVendedor({
          cambios: cambiosImagenes,
          idProducto: producto.idProducto,
          token,
        })
      )
      if (guardarImagenesProductoVendedor.rejected.match(accionImagenes)) {
        throw crearErrorDesdeAccion(accionImagenes, 'No se pudieron guardar las imagenes.')
      }
      resultadoImagenes = accionImagenes.payload
    }

    const productoGuardado = resultadoImagenes?.producto || resultadoProducto.producto
    const guardado = normalizarProductoVendedor(productoGuardado)

    return {
      mensaje: resultadoImagenes?.mensaje || resultadoProducto.mensaje || 'Producto actualizado correctamente',
      mensajeImagenes: resultadoImagenes?.mensaje,
      producto: guardado,
    }
  }

  const cambiarVisibilidadProducto = (producto) =>
    actualizarProducto({ ...producto, activo: !producto.activo })

  const activos = productos.filter((producto) => producto.activo)
  const metricas = [
    { titulo: 'Productos publicados', valor: productos.length, descripcion: 'Total de productos cargados', Icono: Package, destacar: true },
    { titulo: 'Productos activos', valor: activos.length, descripcion: 'Publicados aunque alguno no tenga stock', Icono: PackageCheck },
    { titulo: 'Stock bajo', valor: activos.filter((producto) => producto.stock > 0 && producto.stock <= 5).length, descripcion: 'Productos activos con 1 a 5 unidades', Icono: TriangleAlert },
    { titulo: 'Sin stock', valor: activos.filter((producto) => producto.stock === 0).length, descripcion: 'Productos activos sin unidades', Icono: PackageX },
  ]

  return <>
    <MetricasPanelVendedor cargando={cargando} metricas={metricas} />
    <div className="mt-12"><TablaProductos cargando={cargando} error={error} productos={productos} onActualizarProducto={actualizarProducto} onCambiarVisibilidadProducto={cambiarVisibilidadProducto} /></div>
  </>
}

export default ProductosPanelVendedor
