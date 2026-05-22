import { Button, Card, CardBody, Input } from '@heroui/react'
import { ArrowLeft, LockKeyhole, LogIn, Mail, UserRound, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const obtenerMensajeRegistro = (error) => {
  if (error?.status === 409) {
    return 'Ya existe una cuenta con ese email.'
  }

  if (error instanceof TypeError) {
    return 'No se pudo conectar en este momento. Intenta nuevamente.'
  }

  return error?.message || 'No se pudo crear la cuenta.'
}

const RegistroComprador = () => {
  const navigate = useNavigate()
  const location = useLocation()
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
      await registrarComprador(datos)
      navigate(location.state?.from || '/mi-cuenta', { replace: true })
    } catch (registroError) {
      setError(obtenerMensajeRegistro(registroError))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center">
        <Button
          as={Link}
          className="mb-8 w-fit bg-white text-[#0b2b88] shadow-sm"
          radius="sm"
          startContent={<ArrowLeft size={18} />}
          to="/iniciar-sesion"
        >
          Volver
        </Button>

        <section className="grid items-center gap-10 lg:grid-cols-[1fr_460px]">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-green-700">
              FIGULLECT
            </p>
            <h1 className="mt-4 text-6xl font-black uppercase leading-none text-[#061d58] md:text-7xl">
              Crear
              <br />
              cuenta
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-slate-700">
              El registro crea siempre una cuenta compradora para comprar y gestionar pedidos.
            </p>
          </div>

          <Card className="border border-slate-200 shadow-xl" radius="sm">
            <CardBody className="px-8 py-8">
              <form className="space-y-5" onSubmit={manejarEnvio}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    isRequired
                    label="Nombre"
                    radius="sm"
                    size="lg"
                    startContent={<UserRound className="text-slate-400" size={20} />}
                    value={datos.nombre}
                    variant="bordered"
                    onValueChange={(value) => actualizarCampo('nombre', value)}
                  />

                  <Input
                    isRequired
                    label="Apellido"
                    radius="sm"
                    size="lg"
                    startContent={<UserRound className="text-slate-400" size={20} />}
                    value={datos.apellido}
                    variant="bordered"
                    onValueChange={(value) => actualizarCampo('apellido', value)}
                  />
                </div>

                <Input
                  isRequired
                  label="Correo electronico"
                  radius="sm"
                  size="lg"
                  startContent={<Mail className="text-slate-400" size={20} />}
                  type="email"
                  value={datos.email}
                  variant="bordered"
                  onValueChange={(value) => actualizarCampo('email', value)}
                />

                <Input
                  isRequired
                  label="Contrasena"
                  radius="sm"
                  size="lg"
                  startContent={<LockKeyhole className="text-slate-400" size={20} />}
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
                  className="w-full bg-[#031039] py-7 text-base font-black text-white"
                  isLoading={enviando}
                  radius="sm"
                  startContent={<UserPlus size={20} />}
                  type="submit"
                >
                  Registrarme como comprador
                </Button>

                <Button
                  as={Link}
                  className="w-full font-semibold"
                  radius="sm"
                  startContent={<LogIn size={18} />}
                  to="/iniciar-sesion"
                  variant="light"
                >
                  Ya tengo cuenta
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
