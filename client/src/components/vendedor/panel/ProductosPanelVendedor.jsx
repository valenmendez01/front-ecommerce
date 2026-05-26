import { Package, PackageCheck, PackageX, TriangleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { crearDatosProducto, normalizarProductoVendedor, obtenerProductosPagina } from '../../../data/productosVendedor'
import { obtenerVentasPagina } from '../../../data/ventasVendedor'
import { calcularPrecioFinal, formatearPesos } from '../../../data/reglasProducto'
import MetricasPanelVendedor from './MetricasPanelVendedor'
import TablaProductos from './TablaProductos'
import { guardarImagenesProducto } from '../productos/guardarImagenesProducto'

const obtenerItems = (ventas, idProducto) =>
  ventas.flatMap((venta) => venta.items || []).filter((item) => item.idProducto === idProducto)

const ProductosPanelVendedor = ({ token }) => {
  const [productos, setProductos] = useState([])
  const [ventas, setVentas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let sigueActivo = true
    const headers = { Authorization: `Bearer ${token}` }

    Promise.all([fetch('/productos/vendedor', { headers }), fetch('/ventas/vendedor', { headers })])
      .then(async ([respuestaProductos, respuestaVentas]) => {
        const jsonProductos = await respuestaProductos.json()
        const jsonVentas = await respuestaVentas.json()
        if (!respuestaProductos.ok || !respuestaVentas.ok) throw new Error('No se pudo cargar el panel.')
        if (!sigueActivo) return
        setProductos(obtenerProductosPagina(jsonProductos.data).map(normalizarProductoVendedor))
        setVentas(obtenerVentasPagina(jsonVentas.data))
      })
      .catch((fallo) => sigueActivo && setError(fallo.message))
      .finally(() => sigueActivo && setCargando(false))

    return () => { sigueActivo = false }
  }, [token])

  const actualizarProducto = async (producto, cambiosImagenes) => {
    const respuesta = await fetch(`/productos/${producto.idProducto}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(crearDatosProducto(producto)),
    })
    const json = await respuesta.json()
    if (!respuesta.ok) throw new Error(json.mensaje || json.message || 'No se pudo actualizar el producto.')
    const resultadoImagenes = await guardarImagenesProducto(producto.idProducto, cambiosImagenes, token)
    const guardado = normalizarProductoVendedor(resultadoImagenes?.producto || json.data)
    setProductos((actuales) => actuales.map((actual) => actual.idProducto === guardado.idProducto ? guardado : actual))
    return {
      mensaje: json.mensaje || json.message || resultadoImagenes?.mensaje || 'Producto actualizado correctamente',
      mensajeImagenes: resultadoImagenes?.mensaje,
      producto: guardado,
    }
  }

  const cambiarVisibilidadProducto = (producto) =>
    actualizarProducto({ ...producto, activo: !producto.activo })

  const productosConVentas = productos.map((producto) => {
    const vendidos = obtenerItems(ventas, producto.idProducto).reduce((total, item) => total + item.cantidad, 0)
    return { ...producto, vendidos, precioTexto: formatearPesos(producto.precio), precioFinalTexto: formatearPesos(calcularPrecioFinal(producto.precio, producto.descuento)) }
  })
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
