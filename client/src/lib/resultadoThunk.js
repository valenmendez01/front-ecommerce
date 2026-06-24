export const crearErrorDesdeAccion = (accion, mensajePorDefecto) => {
  const payload = accion.payload
  const mensaje = typeof payload === 'string'
    ? payload
    : payload?.message || accion.error?.message || mensajePorDefecto
  const error = new Error(mensaje)

  if (payload && typeof payload === 'object') {
    Object.assign(error, payload)
  }

  return error
}
