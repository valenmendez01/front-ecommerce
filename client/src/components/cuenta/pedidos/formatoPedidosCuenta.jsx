export const formatearPesosPedido = (monto) =>
  `$${Number(monto || 0).toLocaleString('es-AR')}`
