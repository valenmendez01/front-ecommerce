import { crearFormularioImagenes } from '../../../data/imagenesProducto'

const obtenerErrorRespuesta = async (respuesta, mensaje) => {
  const json = await respuesta.json().catch(() => null)
  return json?.mensaje || json?.message || mensaje
}

export const guardarImagenesProducto = async (idProducto, cambios, token) => {
  const nuevas = cambios?.nuevas || []
  const quitadas = cambios?.quitadas || []
  const headers = { Authorization: `Bearer ${token}` }

  await Promise.all(quitadas.map(async (idImagen) => {
    const respuesta = await fetch(`/productos/${idProducto}/imagenes/${idImagen}`, { method: 'DELETE', headers })
    if (!respuesta.ok) throw new Error(await obtenerErrorRespuesta(respuesta, 'No se pudo quitar una imágen.'))
  }))

  if (nuevas.length > 0) {
    const respuesta = await fetch(`/productos/${idProducto}/imagenes`, {
      method: 'POST',
      headers,
      body: crearFormularioImagenes(nuevas),
    })
    if (!respuesta.ok) throw new Error(await obtenerErrorRespuesta(respuesta, 'No se pudieron guardar las imágenes.'))
  }

  if (nuevas.length === 0 && quitadas.length === 0) return null

  const respuesta = await fetch(`/productos/${idProducto}`, { headers })
  const json = await respuesta.json()
  if (!respuesta.ok) throw new Error(json.mensaje || json.message || 'No se pudo recargar el producto.')
  return json.data
}
