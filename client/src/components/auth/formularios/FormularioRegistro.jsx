import { LockKeyhole, LogIn, Mail, UserPlus, UserRound } from 'lucide-react'
import BotonPrincipalFormulario from '../botones/BotonPrincipalFormulario'
import BotonSecundarioFormulario from '../botones/BotonSecundarioFormulario'
import CampoFormularioAuth from './CampoFormularioAuth'
import EncabezadoFormularioAuth from './EncabezadoFormularioAuth'
import MensajeErrorFormulario from './MensajeErrorFormulario'

const FormularioRegistro = ({ datos, error, enviando, onCampoChange, onSubmit }) => (
  <>
    <EncabezadoFormularioAuth
      etiqueta="Registro comprador"
      titulo="Empeza tu coleccion"
      descripcion="Crea tu cuenta para comprar combos, sumar figuritas y volver cuando quieras a continuar completando tu album."
    />

    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <CampoFormularioAuth
          icono={UserRound}
          label="Nombre"
          value={datos.nombre}
          onChange={(value) => onCampoChange('nombre', value)}
        />
        <CampoFormularioAuth
          icono={UserRound}
          label="Apellido"
          value={datos.apellido}
          onChange={(value) => onCampoChange('apellido', value)}
        />
      </div>
      <CampoFormularioAuth
        icono={Mail}
        label="Correo electrónico"
        type="email"
        value={datos.email}
        onChange={(value) => onCampoChange('email', value)}
      />
      <CampoFormularioAuth
        icono={LockKeyhole}
        label="Contraseña"
        type="password"
        value={datos.contrasena}
        onChange={(value) => onCampoChange('contrasena', value)}
      />
      <MensajeErrorFormulario mensaje={error} />
      <BotonPrincipalFormulario enviando={enviando} icono={UserPlus}>
        Crear mi cuenta
      </BotonPrincipalFormulario>
      <p className="pt-1 text-center text-sm font-semibold text-[#5f6d5a]">
        ¿Ya sos parte de Figullect?
      </p>
      <BotonSecundarioFormulario icono={LogIn} to="/iniciar-sesion">
        Iniciar sesión
      </BotonSecundarioFormulario>
    </form>
  </>
)

export default FormularioRegistro
