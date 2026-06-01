import { Button } from "@heroui/react";
import { useState } from "react";
import CamposTarjetaPago from "./CamposTarjetaPago";
import TarjetaPagoAnimada from "./TarjetaPagoAnimada";

export default function FormularioPago({
  formulario,
  intentoGuardar,
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
        Guardar metodo de pago
      </Button>
    </div>
  );
}
