import { addToast } from "@heroui/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import BotonVolver from "../components/auth/botones/BotonVolver"
import ContenedorAuth from "../components/auth/estructura/ContenedorAuth"
import LayoutAuth from "../components/auth/estructura/LayoutAuth"
import TarjetaFormularioAuth from "../components/auth/estructura/TarjetaFormularioAuth"
import FormularioLogin from "../components/auth/formularios/FormularioLogin"
import PanelPresentacionAuth from "../components/auth/presentacion/PanelPresentacionAuth"
import { beneficiosLogin, obtenerMensajeLogin } from "../lib/loginVista"
import { agregarAlCarrito as agregarAlCarritoRedux } from "../redux/carritoSlice"
import { iniciarSesion } from "../redux/userSlice"

const IniciarSesion = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [credenciales, setCredenciales] = useState({ email: "", contrasena: "" })
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)

  const actualizarCampo = (campo, valor) => {
    setCredenciales((actuales) => ({ ...actuales, [campo]: valor }))
    setError("")
  }

  const agregarProductoPendiente = (usuario) => {
    const producto = location.state?.productoParaCarrito
    if (!producto) return false

    dispatch(agregarAlCarritoRedux({
      producto,
      cantidad: location.state?.cantidadParaCarrito || 1,
      idUsuario: usuario.idUsuario,
    }))
    addToast({
      title: "Producto agregado al carrito",
      description: "Ya podés continuar tu compra.",
      color: "success",
    })
    navigate("/carrito", { replace: true })
    return true
  }

  const manejarEnvio = async (event) => {
    event.preventDefault()
    setEnviando(true)
    setError("")

    try {
      const { usuario } = await dispatch(iniciarSesion(credenciales)).unwrap()
      if (usuario.rol === "VENDEDOR") return navigate("/panel-vendedor", { replace: true })
      if (agregarProductoPendiente(usuario)) return
      navigate(location.state?.from || "/", { replace: true })
    } catch (loginError) {
      const mensaje = obtenerMensajeLogin(loginError)
      setError(mensaje)
      addToast({ title: "No pudimos iniciar sesión", description: mensaje, color: "danger" })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <LayoutAuth>
      <BotonVolver />
      <ContenedorAuth>
        <PanelPresentacionAuth
          etiqueta="Cuenta Figullect"
          titulo={<>Iniciá<br />sesión</>}
          descripcion="¡Empezá el camino de coleccionar tu álbum ahora mismo! Comprá figuritas y accedé a combos imperdibles."
          beneficios={beneficiosLogin}
        />
        <TarjetaFormularioAuth>
          <FormularioLogin
            credenciales={credenciales}
            error={error}
            enviando={enviando}
            locationState={location.state}
            onCampoChange={actualizarCampo}
            onSubmit={manejarEnvio}
          />
        </TarjetaFormularioAuth>
      </ContenedorAuth>
    </LayoutAuth>
  )
}

export default IniciarSesion
