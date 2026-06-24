import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storageModule from 'redux-persist/lib/storage'

import carritoSlice from './carritoSlice'
import catalogoSlice from './catalogoSlice'
import compraSlice from './compraSlice'
import homeSlice from './homeSlice'
import pedidosSlice from './pedidosSlice'
import paypalSlice from './paypalSlice'
import productosVendedorSlice from './productosVendedorSlice'
import recomendadosCarritoSlice from './recomendadosCarritoSlice'
import userSlice from './userSlice'
import ventasSlice from './ventasSlice'
import asistenteSlice from './asistenteSlice'

const storage = storageModule.default ?? storageModule

const ocultarImagenesBase64EnDevTools = (clave, valor) => {
  if (clave !== 'contenidoBase64' || typeof valor !== 'string') return valor
  return `[imagen Base64 omitida en DevTools: ${valor.length} caracteres]`
}

const migrarCarrito = (estadoPersistido) => {
  if (!estadoPersistido) {
    return Promise.resolve(estadoPersistido)
  }

  if (estadoPersistido.carritosPorUsuario) {
    return Promise.resolve({
      idUsuario: null,
      carritosPorUsuario: estadoPersistido.carritosPorUsuario,
    })
  }

  const idUsuario = estadoPersistido.idUsuario ?? null
  const clave = idUsuario ? String(idUsuario) : 'invitado'

  return Promise.resolve({
    idUsuario: null,
    carritosPorUsuario: {
      [clave]: estadoPersistido.articulos || [],
    },
  })
}

const carritoPersistido = persistReducer(
  {
    key: 'carrito',
    version: 2,
    storage,
    whitelist: ['carritosPorUsuario'],
    migrate: migrarCarrito,
  },
  carritoSlice,
)

const userPersistido = persistReducer(
  {
    key: 'user',
    version: 1,
    storage,
    whitelist: ['usuario', 'token'],
  },
  userSlice,
)

export const store = configureStore({
  devTools: {
    serialize: {
      replacer: ocultarImagenesBase64EnDevTools,
    },
  },
  reducer: {
    carrito: carritoPersistido,
    compra: compraSlice,
    productos: catalogoSlice,
    home: homeSlice,
    pedidos: pedidosSlice,
    paypal: paypalSlice,
    productosVendedor: productosVendedorSlice,
    recomendadosCarrito: recomendadosCarritoSlice,
    user: userPersistido,
    ventas: ventasSlice,
    asistente: asistenteSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: ['meta.arg.cambios', 'meta.arg.imagenes'],
      },
    }),
})

export const persistor = persistStore(store)
