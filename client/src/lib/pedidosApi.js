import { apiRequest } from './api'

const obtenerPedidosDePagina = (respuesta) => {
  if (Array.isArray(respuesta)) return respuesta
  return respuesta?.content || []
}

export const obtenerPedidosMios = async () => {
  const respuesta = await apiRequest('/pedidos/mios')
  return obtenerPedidosDePagina(respuesta)
}
