import { useState } from 'react'

export const DATOS_ENVIO = {
  Argentina: { costo: 0, digitosCp: 4 },
  Brasil: { costo: 8000, digitosCp: 8 },
  Chile: { costo: 6000, digitosCp: 7 },
  Uruguay: { costo: 4500, digitosCp: 5 },
  Paraguay: { costo: 5000, digitosCp: 4 },
  Bolivia: { costo: 5500, digitosCp: 4 },
}

const obtenerDigitosCp = (pais) => DATOS_ENVIO[pais]?.digitosCp || 8
const soloNumeros = (valor, pais) =>
  valor.replace(/\D/g, '').slice(0, obtenerDigitosCp(pais))

export const useFormularioEnvio = (alGuardar) => {
  const [abierto, setAbierto] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [intentoGuardar, setIntentoGuardar] = useState(false)
  const [formulario, setFormulario] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    pais: '',
    codigoPostal: '',
  })

  const cpEsperado = obtenerDigitosCp(formulario.pais)
  const cpValido = formulario.codigoPostal.length === cpEsperado
  const formularioValido = Boolean(
    formulario.nombre.trim() &&
    formulario.direccion.trim() &&
    formulario.ciudad.trim() &&
    formulario.pais &&
    cpValido,
  )

  const actualizar = (campo, valor) => {
    setFormulario((actual) => {
      const sanitizadores = {
        nombre: () => valor.replace(/[^\p{L}\s]/gu, '').slice(0, 60),
        ciudad: () => valor.replace(/[^\p{L}\s]/gu, '').slice(0, 60),
        direccion: () => valor.replace(/[^\p{L}\d\s.,#/-]/gu, '').slice(0, 90),
        codigoPostal: () => soloNumeros(valor, actual.pais),
        pais: () => valor,
      }

      return {
        ...actual,
        [campo]: sanitizadores[campo](),
        ...(campo === 'pais'
          ? { codigoPostal: soloNumeros(actual.codigoPostal, valor) }
          : {}),
      }
    })
  }

  const guardar = () => {
    setIntentoGuardar(true)
    if (!formularioValido) return
    setGuardado(true)
    setAbierto(false)
    alGuardar?.({
      ...formulario,
      costoEnvio: DATOS_ENVIO[formulario.pais].costo,
    })
  }

  return {
    abierto,
    cpEsperado,
    cpValido,
    formulario,
    guardado,
    intentoGuardar,
    actualizar,
    guardar,
    alternarAbierto: () => setAbierto((actual) => !actual),
  }
}
