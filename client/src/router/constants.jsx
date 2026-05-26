export const rutasPantallaCompleta = [
  '/mi-cuenta',
  '/panel-vendedor',
  '/crear-producto',
  '/ventas',
  '/carrito',
  '/compra',
  '/iniciar-sesion',
  '/registro',
]

export const rutasPermitidasVendedor = [
  '/panel-vendedor',
  '/crear-producto',
  '/ventas',
]

export const esRutaPermitidaParaVendedor = (pathname) =>
  rutasPermitidasVendedor.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
  )