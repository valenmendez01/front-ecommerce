import { configureStore } from '@reduxjs/toolkit'
import carritoSlice from './carritoSlice'
import catalogoSlice from './catalogoSlice'
import compraSlice from './compraSlice'
import homeSlice from './homeSlice'
import pedidosSlice from './pedidosSlice'
import productosVendedorSlice from './productosVendedorSlice'
import recomendadosCarritoSlice from './recomendadosCarritoSlice'
import ventasSlice from './ventasSlice'

export const store = configureStore(
    {
        reducer: {
            carrito: carritoSlice,
            compra: compraSlice,
            productos: catalogoSlice,
            home: homeSlice,
            pedidos: pedidosSlice,
            productosVendedor: productosVendedorSlice,
            recomendadosCarrito: recomendadosCarritoSlice,
            ventas: ventasSlice,
        }
    }
)
