import { BadgeCheck, ShieldCheck } from "lucide-react"

export const obtenerMensajeLogin = (error) => {
  if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
    return "Email o contraseña incorrectos."
  }

  if (error instanceof TypeError) {
    return "No se pudo conectar en este momento. Intentá nuevamente."
  }

  return error?.message || "No se pudo iniciar sesión."
}

export const beneficiosLogin = [
  { icono: ShieldCheck, texto: "Acceso seguro" },
  { icono: BadgeCheck, texto: "Compra protegida" },
]
