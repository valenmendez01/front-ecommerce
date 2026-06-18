import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AsistenteButton } from './AsistenteButton.jsx'
import { AsistenteWindow } from './AsistenteWindow.jsx'
import { useDatosAsistente } from './useDatosAsistente'
import {
  crearRespuestaRapidaAsistente,
  crearRespuestaSeleccionAsistente,
  obtenerTextoAccionRapida,
  resolverFiltrosDesdeAccion,
} from './asistenteUtils.jsx'
import {
  agregarMensajeAsistente,
  agregarMensajeUsuario,
  alternarAsistente,
  cerrarAsistente,
  definirFlujoActivo,
  preguntarAsistente,
} from '../../redux/asistenteSlice'

const tieneFlujoActivo = (respuesta) =>
  respuesta && Object.prototype.hasOwnProperty.call(respuesta, 'flujoActivo')

export const AsistenteWidget = ({ filtrosActuales, onAplicarFiltro }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const datos = useDatosAsistente(filtrosActuales)
  const { carrito, categorias, crearContextoActual, productosReferencia, selecciones, usuario } = datos
  const { abierto, mensajes, cargando, flujoActivo } = datos.asistente
  const crearRespuestaRapida = useCallback(
    (id) => crearRespuestaRapidaAsistente({ id, usuario, carrito, selecciones, productosReferencia }),
    [carrito, productosReferencia, selecciones, usuario],
  )

  const responder = useCallback((respuesta) => {
    if (!respuesta) return
    if (tieneFlujoActivo(respuesta)) dispatch(definirFlujoActivo(respuesta.flujoActivo))
    dispatch(agregarMensajeAsistente({ texto: respuesta.texto, acciones: respuesta.acciones || [] }))
  }, [dispatch])

  const abrirFlujoSeleccion = useCallback(() => {
    responder(crearRespuestaRapida('buscar-seleccion'))
  }, [crearRespuestaRapida, responder])

  const ejecutarAccionRapida = useCallback((id) => {
    const texto = obtenerTextoAccionRapida(id)
    if (!texto) return

    dispatch(agregarMensajeUsuario(texto))
    responder(crearRespuestaRapida(id))
  }, [crearRespuestaRapida, dispatch, responder])

  const enviarMensaje = useCallback((texto) => {
    dispatch(agregarMensajeUsuario(texto))

    if (flujoActivo === 'seleccion') {
      responder(crearRespuestaSeleccionAsistente(texto, selecciones))
      return
    }

    dispatch(preguntarAsistente({ mensaje: texto, contexto: crearContextoActual() }))
  }, [crearContextoActual, dispatch, flujoActivo, responder, selecciones])

  const ejecutarAccion = useCallback((accion) => {
    if (!accion || accion.tipo === 'ninguno') return

    if (accion.tipo === 'navegar' && accion.ruta) {
      navigate(accion.ruta)
      return
    }

    if (accion.tipo === 'abrirFlujo' && accion.flujo === 'seleccion') {
      abrirFlujoSeleccion()
      return
    }

    if (accion.tipo === 'aplicarFiltro') {
      onAplicarFiltro(resolverFiltrosDesdeAccion(accion, { categorias, selecciones }))
    }
  }, [abrirFlujoSeleccion, categorias, navigate, onAplicarFiltro, selecciones])

  if (usuario?.rol === 'VENDEDOR') return null
  if (!abierto) return <AsistenteButton onPress={() => dispatch(alternarAsistente())} />

  return (
    <AsistenteWindow
      cargando={cargando}
      mensajes={mensajes}
      onAccion={ejecutarAccion}
      onAccionRapida={ejecutarAccionRapida}
      onCerrar={() => dispatch(cerrarAsistente())}
      onEnviar={enviarMensaje}
    />
  )
}
