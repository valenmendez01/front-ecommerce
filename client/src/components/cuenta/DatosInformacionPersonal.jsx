import { CardBody, Chip } from '@heroui/react'
import CorreoPersonal from './CorreoPersonal'

const DatoPersonal = ({ children, titulo }) => (
  <div className="rounded-lg border border-[#d8c49a] bg-white px-4 py-4">
    <p className="text-xs font-bold uppercase tracking-widest text-[#8d6f3e]">{titulo}</p>
    <div className="mt-2 text-xl font-bold text-[#142b10]">{children}</div>
  </div>
)

const DatosInformacionPersonal = ({ email, errorEmail, estaEditando, onCambiarEmail, usuario }) => (
  <CardBody className="grid gap-4 px-8 py-8 md:grid-cols-3">
    <DatoPersonal titulo="Nombre">{usuario.nombre}</DatoPersonal>
    <DatoPersonal titulo="Apellido">{usuario.apellido}</DatoPersonal>
    <CorreoPersonal
      email={email}
      errorEmail={errorEmail}
      estaEditando={estaEditando}
      onCambiarEmail={onCambiarEmail}
    />
    <div className="rounded-lg border border-[#d8c49a] bg-white px-4 py-4">
      <p className="text-xs font-bold uppercase tracking-widest text-[#8d6f3e]">Rol de cuenta</p>
      <Chip className="mt-2 bg-[#142b10] font-bold text-white" radius="full" size="sm">
        {usuario.rolVisible || usuario.rol}
      </Chip>
    </div>
    <DatoPersonal titulo="Fecha de registro">{usuario.fechaCreacion}</DatoPersonal>
    <div className="rounded-lg border border-[#d8c49a] bg-white px-4 py-4">
      <p className="text-xs font-bold uppercase tracking-widest text-[#8d6f3e]">ID de usuario</p>
      <p className="mt-2 text-lg font-semibold text-[#5f6d5a]">{usuario.idUsuarioVisual}</p>
    </div>
  </CardBody>
)

export default DatosInformacionPersonal
