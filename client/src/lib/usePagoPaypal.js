import { addToast } from '@heroui/react'
import { useCallback, useEffect } from 'react'
import { crearErrorDesdeAccion } from './resultadoThunk'
import { vaciarCarritoRedux } from '../redux/carritoSlice'
import { limpiarErrorCompra, registrarErrorCompra } from '../redux/compraSlice'
import { confirmarPedidoPaypal, crearOrdenPaypal, limpiarPagoPaypal } from '../redux/paypalSlice'

const PAYPAL_PENDIENTE_KEY = 'figullect_paypal_pendiente'
const obtenerUrlsPaypal = () => {
  const origen = window.location.origin
  return {
    cancelUrl: `${origen}/compra?paypal=cancelado`,
    returnUrl: `${origen}/compra?paypal=aprobado`,
  }
}

const obtenerItemsPaypal = (articulos) => articulos.map((articulo) => ({
  idProducto: articulo.idProducto ?? articulo.id,
  cantidad: articulo.cantidad,
}))
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
  const confirmarPagoAprobado = useCallback(async (orderId) => {
    try {
      const accion = await dispatch(
        confirmarPedidoPaypal({ articulos, orderId, token, usuario }),
      )

      if (confirmarPedidoPaypal.rejected.match(accion)) {
        throw crearErrorDesdeAccion(accion, 'No se pudo confirmar el pago con PayPal.')
      }
      addToast({ color: 'success', title: accion.payload })
      dispatch(vaciarCarritoRedux())
      sessionStorage.removeItem(PAYPAL_PENDIENTE_KEY)
      navigate('/compra', { replace: true })
    } catch (error) {
      mostrarErrorPaypal(dispatch, 'No se pudo confirmar PayPal', error)
    }
  }, [articulos, dispatch, navigate, token, usuario])

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

    const puedeConfirmar = estadoPaypal === 'aprobado' && orderId && pagoPendiente
      && !paypal.cargandoCaptura && paypal.orderIdCapturado !== orderId
      && usuario && articulos.length > 0

    if (puedeConfirmar) {
      confirmarPagoAprobado(orderId)
    }
  }, [articulos, confirmarPagoAprobado, dispatch, location.search, navigate, paypal, usuario])
  const pagarConPaypal = async () => {
    if (paypal.cargandoCrear) return
    dispatch(limpiarErrorCompra())
    if (!puedePagarPaypal) {
      addToast({ color: 'danger', title: 'Completa la direccion antes de pagar con PayPal.' })
      return
    }
    try {
      const accion = await dispatch(
        crearOrdenPaypal({ ...obtenerUrlsPaypal(), items: obtenerItemsPaypal(articulos), token }),
      )

      if (crearOrdenPaypal.rejected.match(accion)) {
        throw crearErrorDesdeAccion(accion, 'No se pudo iniciar el pago con PayPal.')
      }
      sessionStorage.setItem(PAYPAL_PENDIENTE_KEY, '1')
      window.location.assign(accion.payload.approvalUrl)
    } catch (error) {
      mostrarErrorPaypal(dispatch, 'No se pudo iniciar PayPal', error)
    }
  }
  return { cargandoPaypal: paypal.cargandoCrear || paypal.cargandoCaptura, pagarConPaypal }
}
