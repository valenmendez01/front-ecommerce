import { configureStore } from '@reduxjs/toolkit'
import catalogoSlice from './catalogoSlice'
import homeSlice from './homeSlice'
import pedidosSlice from './pedidosSlice'
import productosVendedorSlice from './productosVendedorSlice'
import ventasSlice from './ventasSlice'

export const store = configureStore(
    {
        reducer: {
            productos: catalogoSlice,
            home: homeSlice,
            pedidos: pedidosSlice,
            productosVendedor: productosVendedorSlice,
            ventas: ventasSlice,
        }
    }
)
