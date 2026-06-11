import { useState } from 'react'

export const obtenerMarcaTarjeta = (digitos) => {
  if (/^4/.test(digitos)) return 'visa'
  if (/^5[1-5]/.test(digitos)) return 'mastercard'

  const prefijo = Number(digitos.slice(0, 4))
  if (digitos.length >= 4 && prefijo >= 2221 && prefijo <= 2720) {
    return 'mastercard'
  }

  return ''
}

const formatearNumero = (valor, numeroActual) => {
  const digitos = valor.replace(/\D/g, '').slice(0, 16)
  if (digitos.length > 4 && !obtenerMarcaTarjeta(digitos)) return numeroActual
  return digitos.replace(/(.{4})/g, '$1 ').trim()
}

const formatearVencimiento = (valor) => {
  const digitos = valor.replace(/\D/g, '').slice(0, 4)
  return digitos.length >= 3
    ? `${digitos.slice(0, 2)}/${digitos.slice(2)}`
    : digitos
}

const vencimientoValido = (valor) => {
  const digitos = valor.replace(/\D/g, '')
  if (digitos.length !== 4) return false

  const mes = Number(digitos.slice(0, 2))
  const anio = 2000 + Number(digitos.slice(2))
  const hoy = new Date()

  return mes >= 1 && mes <= 12 &&
    (anio > hoy.getFullYear() ||
      (anio === hoy.getFullYear() && mes >= hoy.getMonth() + 1))
}

export const useFormularioPago = (alGuardar) => {
  const [abierto, setAbierto] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [intentoGuardar, setIntentoGuardar] = useState(false)
  const [formulario, setFormulario] = useState({
    numero: '',
    titular: '',
    vencimiento: '',
    cvv: '',
  })

  const digitos = formulario.numero.replace(/\s/g, '')
  const tarjetaSoportada = digitos.length < 4 || Boolean(obtenerMarcaTarjeta(digitos))
  const validaciones = {
    numeroValido: digitos.length === 16 && tarjetaSoportada,
    tarjetaSoportada,
    titularValido: formulario.titular.trim().length >= 3,
    vencimientoValido: vencimientoValido(formulario.vencimiento),
    cvvValido: formulario.cvv.length === 3,
  }

  const actualizar = (campo, valor) => {
    setFormulario((actual) => {
      const formateadores = {
        numero: () => formatearNumero(valor, actual.numero),
        titular: () => valor.replace(/[^\p{L}\s]/gu, '').slice(0, 60),
        vencimiento: () => formatearVencimiento(valor),
        cvv: () => valor.replace(/\D/g, '').slice(0, 3),
      }
      return { ...actual, [campo]: formateadores[campo]() }
    })
  }

  const guardar = () => {
    setIntentoGuardar(true)
    if (!Object.values(validaciones).every(Boolean)) return
    setGuardado(true)
    setAbierto(false)
    alGuardar?.(formulario)
  }

  return {
    abierto,
    formulario,
    guardado,
    intentoGuardar,
    metodoVisible: `**** **** **** ${digitos.slice(-4)} - Vence ${formulario.vencimiento}`,
    validaciones,
    actualizar,
    guardar,
    alternarAbierto: () => setAbierto((actual) => !actual),
  }
}
