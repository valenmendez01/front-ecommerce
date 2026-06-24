import { addToast } from '@heroui/react'
import { useCallback, useEffect } from 'react'

import { vaciarCarritoRedux } from '../redux/carritoSlice'
import {
  confirmarPedidoCompra,
  limpiarErrorCompra,
  registrarErrorCompra,
} from '../redux/compraSlice'
import { capturarOrdenPaypal, crearOrdenPaypal, limpiarPagoPaypal } from '../redux/paypalSlice'

const PAYPAL_PENDIENTE_KEY = 'figullect_paypal_pendiente'

const obtenerUrlsPaypal = () => {
  const origen = window.location.origin
  return {
    cancelUrl: `${origen}/compra?paypal=cancelado`,
    returnUrl: `${origen}/compra?paypal=aprobado`,
  }
}

const mostrarErrorPaypal = (dispatch, prefijo, error) => {
  const mensaje = error?.message || error
  dispatch(registrarErrorCompra(`${prefijo}: ${mensaje}`))
  addToast({ color: 'danger', title: mensaje })
}

export const usePagoPaypal = ({
  articulos,
  dispatch,
  location,
  navigate,
  paypal,
  puedePagarPaypal,
  token,
  usuario,
}) => {
  const confirmarPedido = useCallback(async () => {
    const mensaje = await dispatch(
      confirmarPedidoCompra({ articulos, token, usuario }),
    ).unwrap()
    dispatch(vaciarCarritoRedux())
    return mensaje
  }, [articulos, dispatch, token, usuario])

  const confirmarPagoAprobado = useCallback(async (orderId) => {
    try {
      const captura = await dispatch(capturarOrdenPaypal({ orderId, token })).unwrap()

      if (captura.estado !== 'COMPLETED') {
        throw new Error('PayPal no marcó el pago como completado.')
      }

      addToast({ color: 'success', title: await confirmarPedido() })
      sessionStorage.removeItem(PAYPAL_PENDIENTE_KEY)
      navigate('/compra', { replace: true })
    } catch (error) {
      mostrarErrorPaypal(dispatch, 'No se pudo confirmar PayPal', error)
    }
  }, [confirmarPedido, dispatch, navigate, token])

  useEffect(() => {
    const parametros = new URLSearchParams(location.search)
    const estadoPaypal = parametros.get('paypal')
    const orderId = parametros.get('token')
    const pagoPendiente = sessionStorage.getItem(PAYPAL_PENDIENTE_KEY) === '1'

    if (estadoPaypal === 'cancelado') {
      sessionStorage.removeItem(PAYPAL_PENDIENTE_KEY)
      dispatch(limpiarPagoPaypal())
      dispatch(registrarErrorCompra('El pago con PayPal fue cancelado.'))
      navigate('/compra', { replace: true })
      return
    }

    if (
      estadoPaypal === 'aprobado' &&
      orderId &&
      pagoPendiente &&
      !paypal.cargandoCaptura &&
      paypal.orderIdCapturado !== orderId &&
      usuario &&
      articulos.length > 0
    ) {
      confirmarPagoAprobado(orderId)
    }
  }, [articulos, confirmarPagoAprobado, dispatch, location.search, navigate, paypal, usuario])

  const pagarConPaypal = async () => {
    if (paypal.cargandoCrear) return
    dispatch(limpiarErrorCompra())

    if (!puedePagarPaypal) {
      addToast({ color: 'danger', title: 'Completá la dirección antes de pagar con PayPal.' })
      return
    }

    try {
      const items = articulos.map((articulo) => ({
        idProducto: articulo.idProducto ?? articulo.id,
        cantidad: articulo.cantidad,
      }))
      const orden = await dispatch(
        crearOrdenPaypal({ ...obtenerUrlsPaypal(), items, token }),
      ).unwrap()

      sessionStorage.setItem(PAYPAL_PENDIENTE_KEY, '1')
      window.location.assign(orden.approvalUrl)
    } catch (error) {
      mostrarErrorPaypal(dispatch, 'No se pudo iniciar PayPal', error)
    }
  }

  return {
    cargandoPaypal: paypal.cargandoCrear || paypal.cargandoCaptura,
    confirmarPedido,
    pagarConPaypal,
  }
}
