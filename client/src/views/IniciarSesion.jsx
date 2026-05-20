import { Button, Card, CardBody, Input } from '@heroui/react'
import { ArrowLeft, LockKeyhole, LogIn, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const obtenerMensajeLogin = (error) => {
  if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
    return 'Email o contraseña incorrectos.'
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
      const destino = location.state?.from || (usuario.rol === 'VENDEDOR' ? '/panel-vendedor' : '/mi-cuenta')
      navigate(destino, { replace: true })
    } catch (loginError) {
      setError(obtenerMensajeLogin(loginError))
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
          to="/"
        >
          Volver
        </Button>

        <section className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-green-700">
              FIGULLECT
            </p>
            <h1 className="mt-4 text-6xl font-black uppercase leading-none text-[#061d58] md:text-7xl">
              Iniciar
              <br />
              sesion
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-slate-700">
              Accede con tu cuenta para ver tus datos, productos, pedidos y ventas reales.
            </p>
          </div>

          <Card className="border border-slate-200 shadow-xl" radius="sm">
            <CardBody className="px-8 py-8">
              <form className="space-y-6" onSubmit={manejarEnvio}>
                <Input
                  isRequired
                  label="Correo electronico"
                  radius="sm"
                  size="lg"
                  startContent={<Mail className="text-slate-400" size={20} />}
                  type="email"
                  value={credenciales.email}
                  variant="bordered"
                  onValueChange={(value) => actualizarCampo('email', value)}
                />

                <Input
                  isRequired
                  label="Contraseña"
                  radius="sm"
                  size="lg"
                  startContent={<LockKeyhole className="text-slate-400" size={20} />}
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
                  className="w-full bg-[#031039] py-7 text-base font-black text-white"
                  isLoading={enviando}
                  radius="sm"
                  startContent={<LogIn size={20} />}
                  type="submit"
                >
                  Entrar
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
