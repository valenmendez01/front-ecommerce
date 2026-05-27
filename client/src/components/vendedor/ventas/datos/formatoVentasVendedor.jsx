export const formatearPesosVenta = (monto) =>
  `$${Number(monto || 0).toLocaleString('es-AR')}`
