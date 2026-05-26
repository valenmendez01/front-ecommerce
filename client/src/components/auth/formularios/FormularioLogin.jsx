import { LockKeyhole, LogIn, Mail, UserPlus } from 'lucide-react'
import BotonPrincipalFormulario from '../botones/BotonPrincipalFormulario'
import BotonSecundarioFormulario from '../botones/BotonSecundarioFormulario'
import CampoFormularioAuth from './CampoFormularioAuth'
import EncabezadoFormularioAuth from './EncabezadoFormularioAuth'
import MensajeErrorFormulario from './MensajeErrorFormulario'

const FormularioLogin = ({ credenciales, error, enviando, locationState, onCampoChange, onSubmit }) => (
  <>
    <EncabezadoFormularioAuth
      etiqueta="Bienvenido"
      titulo="Volvé a tu album"
      descripcion="Iniciá sesión para continuar tu colección, revisar tus compras y encontrar las figuritas que te faltan."
    />

    <form className="space-y-5" onSubmit={onSubmit}>
      <CampoFormularioAuth
        icono={Mail}
        label="Correo electronico"
        type="email"
        value={credenciales.email}
        onChange={(value) => onCampoChange('email', value)}
      />
      <CampoFormularioAuth
        icono={LockKeyhole}
        label="Contrasena"
        type="password"
        value={credenciales.contrasena}
        onChange={(value) => onCampoChange('contrasena', value)}
      />
      <MensajeErrorFormulario mensaje={error} />
      <BotonPrincipalFormulario enviando={enviando} icono={LogIn}>
        Entrar
      </BotonPrincipalFormulario>
      <p className="pt-2 text-center text-sm font-semibold text-[#5f6d5a]">
        ¿Todavía no tenes cuenta? Sumate y empezá tu colección.
      </p>
      <BotonSecundarioFormulario icono={UserPlus} state={locationState} to="/registro">
        Crear mi cuenta
      </BotonSecundarioFormulario>
    </form>
  </>
)

export default FormularioLogin
