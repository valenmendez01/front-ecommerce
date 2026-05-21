import { CardBody, Chip } from '@heroui/react'
import CorreoPersonal from './CorreoPersonal'

const DatoPersonal = ({ children, titulo }) => (
  <div>
    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{titulo}</p>
    <div className="mt-2 text-xl font-bold text-[#0b2b88]">{children}</div>
  </div>
)

const DatosInformacionPersonal = ({ email, errorEmail, estaEditando, onCambiarEmail, usuario }) => (
  <CardBody className="grid gap-8 px-8 py-8 md:grid-cols-3">
    <DatoPersonal titulo="Nombre">{usuario.nombre}</DatoPersonal>
    <DatoPersonal titulo="Apellido">{usuario.apellido}</DatoPersonal>
    <CorreoPersonal
      email={email}
      errorEmail={errorEmail}
      estaEditando={estaEditando}
      onCambiarEmail={onCambiarEmail}
    />
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rol de cuenta</p>
      <Chip className="mt-2 bg-green-100 font-bold text-green-700" radius="full" size="sm">
        {usuario.rolVisible || usuario.rol}
      </Chip>
    </div>
    <DatoPersonal titulo="Fecha de registro">{usuario.fechaCreacion}</DatoPersonal>
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">ID de usuario</p>
      <p className="mt-2 text-lg text-slate-600">{usuario.idUsuarioVisual}</p>
    </div>
  </CardBody>
)

export default DatosInformacionPersonal
