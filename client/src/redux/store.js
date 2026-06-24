import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createTransform,
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

const limpiarImagenPesadaArticulo = (articulo) => {
  const imagenEsBase64 = typeof articulo.imagen === 'string' && articulo.imagen.startsWith('data:image')
  const articuloLiviano = { ...articulo, imagen: imagenEsBase64 ? '' : articulo.imagen }

  delete articuloLiviano.imagenes
  delete articuloLiviano.contenidoBase64

  return articuloLiviano
}

const limpiarCarritosPersistidos = (carritosPorUsuario = {}) =>
  Object.fromEntries(
    Object.entries(carritosPorUsuario).map(([idUsuario, articulos]) => [
      idUsuario,
      Array.isArray(articulos) ? articulos.map(limpiarImagenPesadaArticulo) : [],
    ]),
  )

const migrarCarrito = (estadoPersistido) => {
  if (!estadoPersistido) {
    return Promise.resolve(estadoPersistido)
  }

  if (estadoPersistido.carritosPorUsuario) {
    return Promise.resolve({
      idUsuario: null,
      carritosPorUsuario: limpiarCarritosPersistidos(estadoPersistido.carritosPorUsuario),
    })
  }

  const idUsuario = estadoPersistido.idUsuario ?? null
  const clave = idUsuario ? String(idUsuario) : 'invitado'

  return Promise.resolve({
    idUsuario: null,
    carritosPorUsuario: {
      [clave]: (estadoPersistido.articulos || []).map(limpiarImagenPesadaArticulo),
    },
  })
}

const limpiarCarritoAntesDePersistir = createTransform(
  (carritosPorUsuario) => limpiarCarritosPersistidos(carritosPorUsuario),
  (estado) => estado,
  { whitelist: ['carritosPorUsuario'] },
)

const carritoPersistido = persistReducer(
  {
    key: 'carrito',
    version: 3,
    storage,
    whitelist: ['carritosPorUsuario'],
    migrate: migrarCarrito,
    transforms: [limpiarCarritoAntesDePersistir],
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
