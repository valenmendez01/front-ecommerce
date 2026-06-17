import { Button } from "@heroui/react";
import { useState } from "react";
import BotonPaypal from "./BotonPaypal";
import CamposTarjetaPago from "./CamposTarjetaPago";
import TarjetaPagoAnimada from "./TarjetaPagoAnimada";

export default function FormularioPago({
  alPagarPaypal,
  cargandoPaypal,
  formulario,
  intentoGuardar,
  puedePagarPaypal,
  validaciones,
  alActualizar,
  alGuardar,
}) {
  const [campoActivo, setCampoActivo] = useState("");

  return (
    <div className="p-4 bg-white border-t border-dorado-primary/30 flex flex-col gap-3">
      <TarjetaPagoAnimada formulario={formulario} cvvActivo={campoActivo === "cvv"} />
      <CamposTarjetaPago
        campoActivo={campoActivo}
        formulario={formulario}
        intentoGuardar={intentoGuardar}
        validaciones={validaciones}
        alActualizar={alActualizar}
        alActivarCampo={setCampoActivo}
      />

      <Button onPress={alGuardar} className="w-full bg-dorado-primary text-black text-sm font-bold rounded-lg">
        Guardar método de pago
      </Button>

      <SeparadorPago />

      <BotonPaypal
        alPagar={alPagarPaypal}
        cargando={cargandoPaypal}
        puedePagar={puedePagarPaypal}
      />
    </div>
  );
}

function SeparadorPago() {
  return (
    <div className="flex items-center gap-3 py-1 text-xs font-bold uppercase tracking-widest text-green-primary/45">
      <span className="h-px flex-1 bg-dorado-primary/30" />
      <span>o</span>
      <span className="h-px flex-1 bg-dorado-primary/30" />
    </div>
  );
}
