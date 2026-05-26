import { Button, Input } from "@heroui/react";

const clasesCampo = { label: "text-xs font-semibold text-green-primary/70" };

export default function FormularioPago({
  formulario,
  intentoGuardar,
  validaciones,
  alActualizar,
  alGuardar,
}) {
  return (
    <div className="p-4 bg-white border-t border-dorado-primary/30 flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          isInvalid={intentoGuardar && !validaciones.numeroValido}
          label="NÃºmero de tarjeta"
          placeholder="0000 0000 0000 0000"
          value={formulario.numero}
          errorMessage="La tarjeta debe tener 16 nÃºmeros."
          inputMode="numeric"
          maxLength={19}
          onValueChange={(value) => alActualizar("numero", value)}
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
          errorMessage="UsÃ¡ un vencimiento vÃ¡lido."
          inputMode="numeric"
          maxLength={5}
          onValueChange={(value) => alActualizar("vencimiento", value)}
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
          errorMessage="El CVV debe tener 3 o 4 nÃºmeros."
          inputMode="numeric"
          maxLength={4}
          onValueChange={(value) => alActualizar("cvv", value)}
          variant="bordered"
          radius="sm"
          classNames={clasesCampo}
        />
      </div>

      <Button onPress={alGuardar} className="w-full bg-dorado-primary text-black text-sm font-bold rounded-lg">
        Guardar mÃ©todo de pago
      </Button>
    </div>
  );
}
