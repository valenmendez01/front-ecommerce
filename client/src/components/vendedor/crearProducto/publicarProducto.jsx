import { crearFormularioImagenes } from './imagenesCrearProducto'
import { crearDatosProducto, obtenerMensajeRespuesta } from './reglasCrearProducto'

const publicarImagenesProducto = async (idProducto, imagenes, token) => {
  const respuesta = await fetch(`/productos/${idProducto}/imagenes`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: crearFormularioImagenes(imagenes),
  })
  const json = await respuesta.json().catch(() => null)
  if (!respuesta.ok) {
    throw new Error(obtenerMensajeRespuesta(json, 'No se pudieron guardar las imagenes.'))
  }
  return json
}

export const publicarProducto = async (producto, imagenes, token) => {
  const respuesta = await fetch('/productos', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(crearDatosProducto(producto)),
  })
  const json = await respuesta.json()
  if (!respuesta.ok) throw new Error(obtenerMensajeRespuesta(json, 'No se pudo crear el producto.'))

  const jsonImagenes = await publicarImagenesProducto(json.data.idProducto, imagenes, token)

  return {
    mensaje: obtenerMensajeRespuesta(json, 'Producto creado exitosamente'),
    mensajeImagenes: obtenerMensajeRespuesta(jsonImagenes, ''),
  }
}
