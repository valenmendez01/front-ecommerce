import { Input } from "@heroui/react";

const clasesCampo = { label: "text-xs font-semibold text-green-primary/70" };

export default function CamposTarjetaPago({ campoActivo, formulario, intentoGuardar, validaciones, alActualizar, alActivarCampo }) {
  const mostrarErrorNumero = !validaciones.tarjetaSoportada || (intentoGuardar && !validaciones.numeroValido);
  const errorNumero = !validaciones.tarjetaSoportada
    ? "Solo se aceptan tarjetas Visa o Mastercard."
    : "La tarjeta debe tener 16 numeros.";

  return (
    <div className="grid grid-cols-2 gap-3">
      <Input
        isInvalid={mostrarErrorNumero}
        label="Numero de tarjeta"
        placeholder="0000 0000 0000 0000"
        value={formulario.numero}
        errorMessage={errorNumero}
        inputMode="numeric"
        maxLength={19}
        onValueChange={(value) => alActualizar("numero", value)}
        onFocus={() => alActivarCampo("numero")}
        variant="bordered"
        radius="sm"
        classNames={clasesCampo}
        className="col-span-2"
      />

      <Input
        isInvalid={intentoGuardar && !validaciones.titularValido}
        label="Titular de la tarjeta"
        placeholder="Como figura en la tarjeta"
        value={formulario.titular}
        errorMessage="Ingresa solo letras."
        onValueChange={(value) => alActualizar("titular", value)}
        onFocus={() => alActivarCampo("titular")}
        variant="bordered"
        radius="sm"
        classNames={clasesCampo}
        className="col-span-2"
      />

      <Input
        isInvalid={intentoGuardar && !validaciones.vencimientoValido}
        label="Vencimiento"
        placeholder="MM/AA"
        value={formulario.vencimiento}
        errorMessage="Usa un vencimiento valido."
        inputMode="numeric"
        maxLength={5}
        onValueChange={(value) => alActualizar("vencimiento", value)}
        onFocus={() => alActivarCampo("vencimiento")}
        variant="bordered"
        radius="sm"
        classNames={clasesCampo}
      />

      <Input
        isInvalid={intentoGuardar && !validaciones.cvvValido}
        label="CVV"
        placeholder="123"
        type="password"
        value={formulario.cvv}
        errorMessage="El CVV debe tener 3 numeros."
        inputMode="numeric"
        maxLength={3}
        onValueChange={(value) => alActualizar("cvv", value)}
        onFocus={() => alActivarCampo("cvv")}
        onBlur={() => campoActivo === "cvv" && alActivarCampo("")}
        variant="bordered"
        radius="sm"
        classNames={clasesCampo}
      />
    </div>
  );
}
