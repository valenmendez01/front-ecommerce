const esErrorTemporalServidor = (response, message) => {
  const mensaje = message?.toLowerCase() || ''
  return [502, 503, 504].includes(response.status) || mensaje.includes('bad gateway')
}

const obtenerMensajeError = (response, payload) => {
  const message = payload?.mensaje || payload?.message || response.statusText

  if (esErrorTemporalServidor(response, message)) {
    return 'El servidor tardó demasiado en responder. Intentá nuevamente en unos segundos.'
  }

  return message
}

export const apiRequest = async (endpoint, options = {}) => {
  const { auth = true, headers, body, token, ...fetchOptions } = options
  const requestHeaders = new Headers(headers)

  if (auth && token) {
    requestHeaders.set('Authorization', `Bearer ${token}`)
  }

  if (body && !(body instanceof FormData) && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  const response = await fetch(endpoint, {
    ...fetchOptions,
    headers: requestHeaders,
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
  })

  const text = await response.text()
  let payload

  try {
    payload = text ? JSON.parse(text) : null
  } catch {
    payload = text ? { message: text } : null
  }

  if (!response.ok) {
    const message = obtenerMensajeError(response, payload)
    const error = new Error(message)
    error.status = response.status
    error.payload = payload
    throw error
  }

  return payload?.data ?? payload
}
