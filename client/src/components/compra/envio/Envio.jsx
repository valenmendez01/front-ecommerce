import { CheckCircle2, Truck } from "lucide-react";

import CabeceraAcordeon from "../CabeceraAcordeon";
import FormularioEnvio from "./FormularioEnvio";
import { SpotlightCard } from "../../ui/spotlight-card";
import { DATOS_ENVIO, useFormularioEnvio } from "../../../lib/useFormularioEnvio";

export default function Envio({ alGuardar }) {
  const envio = useFormularioEnvio(alGuardar);

  return (
    <SpotlightCard posicionLuz="derecha" className="rounded-xl border border-dorado-primary/25 shadow-sm">
      <CabeceraAcordeon
        abierto={envio.abierto}
        guardado={envio.guardado}
        iconoPendiente={<Truck size={18} className="text-green-primary" />}
        iconoGuardado={<CheckCircle2 size={18} className="text-green-primary" />}
        titulo="Dirección de envío"
        subtitulo="Completá tu dirección"
        subtituloGuardado={`${envio.formulario.nombre} - ${envio.formulario.ciudad}, ${envio.formulario.pais}`}
        alCambiar={envio.alternarAbierto}
      />

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${envio.abierto ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"}`}>
        <FormularioEnvio
          formulario={envio.formulario}
          datosEnvio={DATOS_ENVIO}
          intentoGuardar={envio.intentoGuardar}
          cpValido={envio.cpValido}
          cpEsperado={envio.cpEsperado}
          alActualizar={envio.actualizar}
          alGuardar={envio.guardar}
        />
      </div>
    </SpotlightCard>
  );
}
