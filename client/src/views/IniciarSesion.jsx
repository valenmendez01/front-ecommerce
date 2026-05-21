import { Button, Card, CardBody, Input } from '@heroui/react'
import {
  ArrowLeft,
  BadgeCheck,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
  UserPlus,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logoHorizontal.png'
import { useAuth } from '../context/useAuth'

const obtenerMensajeLogin = (error) => {
  if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
    return 'Email o contrasena incorrectos.'
  }

  if (error instanceof TypeError) {
    return 'No se pudo conectar con el backend. Revisa que este corriendo en el puerto 4002.'
  }

  return error?.message || 'No se pudo iniciar sesion.'
}

const IniciarSesion = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { iniciarSesion } = useAuth()
  const [credenciales, setCredenciales] = useState({ email: '', contrasena: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const actualizarCampo = (campo, valor) => {
    setCredenciales((actuales) => ({ ...actuales, [campo]: valor }))
    setError('')
  }

  const manejarEnvio = async (event) => {
    event.preventDefault()
    setEnviando(true)
    setError('')

    try {
      const usuario = await iniciarSesion(credenciales)
      const destino =
        location.state?.from || (usuario.rol === 'VENDEDOR' ? '/panel-vendedor' : '/mi-cuenta')
      navigate(destino, { replace: true })
    } catch (loginError) {
      setError(obtenerMensajeLogin(loginError))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ec] px-6 py-8 text-[#142b10]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center">
        <Button
          as={Link}
          className="mb-8 w-fit border border-[#d8c49a] bg-white/80 font-semibold text-[#142b10] shadow-sm"
          radius="sm"
          startContent={<ArrowLeft size={18} />}
          to="/"
          variant="bordered"
        >
          Volver
        </Button>

        <section className="grid overflow-hidden rounded-2xl border border-[#d8c49a] bg-white shadow-2xl shadow-[#142b10]/10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative flex min-h-[560px] flex-col justify-between overflow-hidden bg-[#142b10] px-8 py-8 text-white md:px-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#caa56e]/25" />
            <div className="absolute -bottom-28 left-12 h-72 w-72 rounded-full border border-[#caa56e]/20" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/25 to-transparent" />

            <div className="relative">
              <img className="h-14 w-auto" src={logo} alt="Figullect" />
            </div>

            <div className="relative max-w-xl">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#caa56e]">
                Cuenta Figullect
              </p>
              <h1 className="mt-5 text-5xl font-black uppercase leading-none md:text-7xl">
                Inicia
                <br />
                sesion
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-white/75">
                Empieza el camino de coleccionar tu álbum ahora mismo! Comprá figuritas y accedé a combos imperdibles. 
              </p>
            </div>

            <div className="relative grid gap-3 text-sm font-semibold text-white/80 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <ShieldCheck className="text-[#caa56e]" size={20} />
                Acceso seguro
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <BadgeCheck className="text-[#caa56e]" size={20} />
                Compra protegida
              </div>
            </div>
          </div>

          <Card className="border-0 bg-[#fffdf8] shadow-none" radius="none">
            <CardBody className="flex min-h-[560px] justify-center px-8 py-10 md:px-12">
              <div className="mb-8">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#8d6f3e]">
                  Bienvenido
                </p>
                <h2 className="mt-3 text-3xl font-black text-[#142b10]">
                  Volvé a tu album
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#5f6d5a]">
                  Iniciá sesion para continuar tu colección, revisar tus compras y encontrar las
                  figuritas que te faltan.
                </p>
              </div>

              <form className="space-y-5" onSubmit={manejarEnvio}>
                <Input
                  isRequired
                  classNames={{
                    inputWrapper:
                      'border-[#d8c49a] bg-white shadow-sm group-data-[focus=true]:border-[#caa56e]',
                    label: 'text-[#52614d]',
                    input: 'text-[#142b10]',
                  }}
                  label="Correo electronico"
                  radius="sm"
                  size="lg"
                  startContent={<Mail className="text-[#8d6f3e]" size={20} />}
                  type="email"
                  value={credenciales.email}
                  variant="bordered"
                  onValueChange={(value) => actualizarCampo('email', value)}
                />

                <Input
                  isRequired
                  classNames={{
                    inputWrapper:
                      'border-[#d8c49a] bg-white shadow-sm group-data-[focus=true]:border-[#caa56e]',
                    label: 'text-[#52614d]',
                    input: 'text-[#142b10]',
                  }}
                  label="Contrasena"
                  radius="sm"
                  size="lg"
                  startContent={<LockKeyhole className="text-[#8d6f3e]" size={20} />}
                  type="password"
                  value={credenciales.contrasena}
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
                  startContent={<LogIn size={20} />}
                  type="submit"
                >
                  Entrar
                </Button>

                <p className="pt-2 text-center text-sm font-semibold text-[#5f6d5a]">
                  Todavia no tenes cuenta? Sumate y empeza tu coleccion.
                </p>

                <Button
                  as={Link}
                  className="w-full border border-[#d8c49a] bg-white font-bold text-[#142b10]"
                  radius="sm"
                  startContent={<UserPlus size={18} />}
                  state={location.state}
                  to="/registro"
                  variant="bordered"
                >
                  Crear mi cuenta
                </Button>
              </form>
            </CardBody>
          </Card>
        </section>
      </div>
    </main>
  )
}

export default IniciarSesion
