import {
  CircleUserRound,
  Grid2X2,
  PlusSquare,
  ShoppingCart,
  WalletCards,
} from 'lucide-react'

export const opcionesCliente = [
  { texto: 'Mi cuenta', ruta: '/mi-cuenta', Icono: CircleUserRound },
  { texto: 'Mi carrito', ruta: '/carrito', Icono: ShoppingCart },
  { texto: 'Catálogo', ruta: '/productos', Icono: Grid2X2 },
]

export const opcionesVendedor = [
  { texto: 'Panel vendedor', ruta: '/panel-vendedor', Icono: Grid2X2 },
  { texto: 'Crear producto', ruta: '/crear-producto', Icono: PlusSquare },
  { texto: 'Ventas', ruta: '/ventas', Icono: WalletCards },
]
