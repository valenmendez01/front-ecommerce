import { CheckCircle2, CreditCard } from "lucide-react";

import CabeceraAcordeon from "../CabeceraAcordeon";
import FormularioPago from "./FormularioPago";
import { SpotlightCard } from "../../ui/spotlight-card";
import { useFormularioPago } from "../../../lib/useFormularioPago";

export default function Pago({ alGuardar }) {
  const pago = useFormularioPago(alGuardar);

  return (
    <SpotlightCard posicionLuz="derecha" className="rounded-xl border border-dorado-primary/25 shadow-sm">
      <CabeceraAcordeon
        abierto={pago.abierto}
        guardado={pago.guardado}
        iconoPendiente={<CreditCard size={18} className="text-green-primary" />}
        iconoGuardado={<CheckCircle2 size={18} className="text-green-primary" />}
        titulo="Metodo de pago"
        subtitulo="Tarjeta de credito / debito"
        subtituloGuardado={pago.metodoVisible}
        alCambiar={pago.alternarAbierto}
      />

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${pago.abierto ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"}`}>
        <FormularioPago
          formulario={pago.formulario}
          intentoGuardar={pago.intentoGuardar}
          validaciones={pago.validaciones}
          alActualizar={pago.actualizar}
          alGuardar={pago.guardar}
        />
      </div>
    </SpotlightCard>
  );
}
