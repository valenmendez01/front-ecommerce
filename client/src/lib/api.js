export const TOKEN_STORAGE_KEY = 'figullect_access_token'

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY)

export const setStoredToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

export const apiRequest = async (endpoint, options = {}) => {
  const { auth = true, headers, body, ...fetchOptions } = options
  const token = getStoredToken()
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
    const message = payload?.mensaje || payload?.message || response.statusText
    const error = new Error(message)
    error.status = response.status
    error.payload = payload
    throw error
  }

  return payload?.data ?? payload
}
