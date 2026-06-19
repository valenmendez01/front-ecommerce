import { AsistenteQuickActions } from './AsistenteQuickActions.jsx'
import { EncabezadoAsistente } from './EncabezadoAsistente.jsx'
import { FormularioConsultaAsistente } from './FormularioConsultaAsistente.jsx'
import { ListaMensajesAsistente } from './ListaMensajesAsistente.jsx'

export const AsistenteWindow = ({ mensajes, cargando, onCerrar, onEnviar, onAccionRapida, onAccion }) => (
  <section className="flex h-[640px] max-h-[calc(100vh-3rem)] w-[430px] flex-col overflow-hidden rounded-2xl border border-[var(--color-dorado-primary)]/30 bg-[#fffaf0] shadow-2xl">
    <EncabezadoAsistente onCerrar={onCerrar} />
    <ListaMensajesAsistente cargando={cargando} mensajes={mensajes} onAccion={onAccion} />
    <AsistenteQuickActions deshabilitado={cargando} onSeleccionar={onAccionRapida} />
    <FormularioConsultaAsistente cargando={cargando} onEnviar={onEnviar} />
  </section>
)
