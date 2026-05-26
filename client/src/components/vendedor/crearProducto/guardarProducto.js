import { crearDatosProducto } from '../../../data/productosVendedor'
import { crearFormularioImagenes } from '../../../data/imagenesProducto'

const obtenerMensajeRespuesta = (json, mensaje) => json?.mensaje || json?.message || mensaje

export const guardarProducto = async (producto, imagenes, token) => {
  const respuesta = await fetch('/productos', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(crearDatosProducto(producto)),
  })
  const json = await respuesta.json()
  if (!respuesta.ok) throw new Error(obtenerMensajeRespuesta(json, 'No se pudo crear el producto.'))

  const respuestaImagenes = await fetch(`/productos/${json.data.idProducto}/imagenes`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: crearFormularioImagenes(imagenes),
  })
  const jsonImagenes = await respuestaImagenes.json().catch(() => null)
  if (!respuestaImagenes.ok) {
    throw new Error(obtenerMensajeRespuesta(jsonImagenes, 'No se pudieron guardar las imagenes.'))
  }

  return {
    mensaje: obtenerMensajeRespuesta(json, 'Producto creado exitosamente'),
    mensajeImagenes: obtenerMensajeRespuesta(jsonImagenes, ''),
    producto: json.data,
  }
}
