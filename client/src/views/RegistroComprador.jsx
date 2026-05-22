import { Button, Card, CardBody, Input } from '@heroui/react'
import {
  HeartHandshake,
  LockKeyhole,
  LogIn,
  Mail,
  PackageCheck,
  ShieldCheck,
  UserRound,
  UserPlus,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logoHorizontal.png'
import { useAuth } from '../context/useAuth'

const MENSAJE_BIENVENIDA_KEY = 'figullect_mensaje_bienvenida'

const obtenerMensajeRegistro = (error) => {
  if (error?.status === 409) {
    return 'Ya existe una cuenta con ese email.'
  }

  if (error instanceof TypeError) {
    return 'No se pudo conectar con el backend. Revisa que este corriendo en el puerto 4002.'
  }

  return error?.message || 'No se pudo crear la cuenta.'
}

const clasesInput = {
  inputWrapper: 'border-[#d8c49a] bg-white shadow-sm group-data-[focus=true]:border-[#caa56e]',
  label: 'text-[#52614d]',
  input: 'text-[#142b10]',
}

const RegistroComprador = () => {
  const navigate = useNavigate()
  const { registrarComprador } = useAuth()
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
  })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const actualizarCampo = (campo, valor) => {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }))
    setError('')
  }

  const manejarEnvio = async (event) => {
    event.preventDefault()
    setEnviando(true)
    setError('')

    try {
      const usuario = await registrarComprador(datos)
      sessionStorage.setItem(
        MENSAJE_BIENVENIDA_KEY,
        `Bienvenido a Figullect, ${usuario.nombre || datos.nombre || 'coleccionista'}! Tu cuenta ya esta lista para empezar a completar tu album.`,
      )
      navigate('/', { replace: true })
    } catch (registroError) {
      setError(obtenerMensajeRegistro(registroError))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ec] px-6 py-8 text-[#142b10]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center">
        <section className="grid overflow-hidden rounded-2xl border border-[#d8c49a] bg-white shadow-2xl shadow-[#142b10]/10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative flex min-h-[620px] flex-col justify-between overflow-hidden bg-[#142b10] px-8 py-8 text-white md:px-12">
            <div className="absolute -left-20 top-20 h-56 w-56 rounded-full border border-[#caa56e]/20" />
            <div className="absolute -right-28 -bottom-24 h-72 w-72 rounded-full border border-[#caa56e]/25" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/25 to-transparent" />

            <div className="relative">
              <img className="h-14 w-auto" src={logo} alt="Figullect" />
            </div>

            <div className="relative max-w-xl">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#caa56e]">
                Nuevo coleccionista
              </p>
              <h1 className="mt-5 text-5xl font-black uppercase leading-none md:text-7xl">
                Crea tu
                <br />
                cuenta
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-white/75">
                Registrate para guardar tu progreso, comprar figuritas y armar tu
                album con confianza.
              </p>
            </div>

            <div className="relative grid gap-3 text-sm font-semibold text-white/80">
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <ShieldCheck className="text-[#caa56e]" size={20} />
                Tus datos quedan protegidos
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <PackageCheck className="text-[#caa56e]" size={20} />
                Segui tus compras y pedidos
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <HeartHandshake className="text-[#caa56e]" size={20} />
                Una experiencia simple y amigable
              </div>
            </div>
          </div>

          <Card className="border-0 bg-[#fffdf8] shadow-none" radius="none">
            <CardBody className="flex min-h-[620px] justify-center px-8 py-10 md:px-12">
              <div className="mb-8">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#8d6f3e]">
                  Registro comprador
                </p>
                <h2 className="mt-3 text-3xl font-black text-[#142b10]">
                  Empeza tu coleccion
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#5f6d5a]">
                  Crea tu cuenta para comprar combos, sumar figuritas y volver cuando quieras a
                  continuar completando tu album.
                </p>
              </div>

              <form className="space-y-5" onSubmit={manejarEnvio}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    isRequired
                    classNames={clasesInput}
                    label="Nombre"
                    radius="sm"
                    size="lg"
                    startContent={<UserRound className="text-[#8d6f3e]" size={20} />}
                    value={datos.nombre}
                    variant="bordered"
                    onValueChange={(value) => actualizarCampo('nombre', value)}
                  />

                  <Input
                    isRequired
                    classNames={clasesInput}
                    label="Apellido"
                    radius="sm"
                    size="lg"
                    startContent={<UserRound className="text-[#8d6f3e]" size={20} />}
                    value={datos.apellido}
                    variant="bordered"
                    onValueChange={(value) => actualizarCampo('apellido', value)}
                  />
                </div>

                <Input
                  isRequired
                  classNames={clasesInput}
                  label="Correo electronico"
                  radius="sm"
                  size="lg"
                  startContent={<Mail className="text-[#8d6f3e]" size={20} />}
                  type="email"
                  value={datos.email}
                  variant="bordered"
                  onValueChange={(value) => actualizarCampo('email', value)}
                />

                <Input
                  isRequired
                  classNames={clasesInput}
                  label="Contrasena"
                  radius="sm"
                  size="lg"
                  startContent={<LockKeyhole className="text-[#8d6f3e]" size={20} />}
                  type="password"
                  value={datos.contrasena}
                  variant="bordered"
                  onValueChange={(value) => actualizarCampo('contrasena', value)}
                />

                {error && (
                  <div
                    aria-live="polite"
                    className="rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
                  >
                    {error}
                  </div>
                )}

                <Button
                  className="w-full bg-[#142b10] py-7 text-base font-black text-white shadow-lg shadow-[#142b10]/20"
                  isLoading={enviando}
                  radius="sm"
                  startContent={<UserPlus size={20} />}
                  type="submit"
                >
                  Crear mi cuenta
                </Button>

                <p className="pt-1 text-center text-sm font-semibold text-[#5f6d5a]">
                  Ya sos parte de Figullect?
                </p>

                <Button
                  as={Link}
                  className="w-full border border-[#d8c49a] bg-white font-bold text-[#142b10]"
                  radius="sm"
                  startContent={<LogIn size={18} />}
                  to="/iniciar-sesion"
                  variant="bordered"
                >
                  Iniciar sesion
                </Button>
              </form>
            </CardBody>
          </Card>
        </section>
      </div>
    </main>
  )
}

export default RegistroComprador
