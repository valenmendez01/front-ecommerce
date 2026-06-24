import { addToast } from '@heroui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { seleccionarArticulosCarrito } from '../redux/carritoSlice'
import {
  guardarEnvioCompra,
  guardarPagoCompra,
  registrarErrorCompra,
  reiniciarCompra,
} from '../redux/compraSlice'
import { calcularResumenCarrito } from './reglasCarrito'
import { usePagoPaypal } from './usePagoPaypal'

export const useCompra = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { usuario, token } = useSelector((state) => state.user)
  const articulos = useSelector(seleccionarArticulosCarrito)
  const compra = useSelector((state) => state.compra)
  const paypal = useSelector((state) => state.paypal)
  const esComprador = usuario?.rol === 'COMPRADOR'
  const resumen = calcularResumenCarrito(
    articulos,
    compra.envioGuardado ? compra.costoEnvio : null,
  )

  const puedeConfirmar = Boolean(
    compra.envioGuardado &&
    compra.pagoGuardado &&
    articulos.length > 0 &&
    esComprador,
  )
  const puedePagarPaypal = Boolean(
    compra.envioGuardado &&
    articulos.length > 0 &&
    esComprador,
  )

  const pagoPaypal = usePagoPaypal({
    articulos,
    dispatch,
    location,
    navigate,
    paypal,
    puedePagarPaypal,
    resumen,
    token,
    usuario,
  })

  useEffect(() => () => dispatch(reiniciarCompra()), [dispatch])

  const confirmar = async () => {
    if (compra.cargandoConfirmar) return

    if (!usuario || !esComprador) {
      const mensaje = usuario
        ? 'Solo una cuenta compradora puede confirmar pedidos.'
        : 'Tenés que iniciar sesión para confirmar el pedido.'
      dispatch(registrarErrorCompra(mensaje))
      return
    }

    try {
      addToast({ color: 'success', title: await pagoPaypal.confirmarPedido() })
    } catch (error) {
      addToast({
        color: 'danger',
        title: error?.message || 'No se pudo confirmar el pedido.',
      })
    }
  }

  return {
    ...compra,
    articulos,
    cargandoPaypal: pagoPaypal.cargandoPaypal,
    esComprador,
    esVendedor: Boolean(usuario && !esComprador),
    puedeConfirmar,
    puedePagarPaypal,
    resumen,
    confirmar,
    pagarConPaypal: pagoPaypal.pagarConPaypal,
    guardarEnvio: (datos) => dispatch(guardarEnvioCompra(datos)),
    guardarPago: () => dispatch(guardarPagoCompra()),
    irAlCarrito: () => navigate('/carrito'),
    irAlInicio: () => navigate('/'),
  }
}
