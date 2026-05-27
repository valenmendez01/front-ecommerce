export const obtenerVentasPaginaPanel = (data) => {
  if (Array.isArray(data)) return data
  return data?.content || []
}
