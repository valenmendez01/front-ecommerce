import { configureStore } from '@reduxjs/toolkit'
import catalogoSlice from './catalogoSlice'

export const store = configureStore(
    {
        reducer: {productos: catalogoSlice}
    }
)