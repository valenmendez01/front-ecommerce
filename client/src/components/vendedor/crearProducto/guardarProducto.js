import { crearDatosProducto } from '../../../data/productosVendedor'
import { crearFormularioImagenes } from '../../../data/imagenesProducto'

export const guardarProducto = async (producto, imagenes, token) => {
  const respuesta = await fetch('/productos', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(crearDatosProducto(producto)),
  })
  const json = await respuesta.json()
  if (!respuesta.ok) throw new Error(json.mensaje || json.message || 'No se pudo crear el producto.')

  const respuestaImagenes = await fetch(`/productos/${json.data.idProducto}/imagenes`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: crearFormularioImagenes(imagenes),
  })
  if (!respuestaImagenes.ok) throw new Error('No se pudieron guardar las imagenes.')
}
