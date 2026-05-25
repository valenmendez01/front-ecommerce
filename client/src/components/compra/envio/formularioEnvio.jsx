import { Button, Input, Select, SelectItem } from "@heroui/react";

const PAISES = ["Argentina", "Brasil", "Chile", "México", "España", "Estados Unidos", "Qatar"];
const clasesCampo = { label: "text-xs font-semibold text-gray-600" };

export default function FormularioEnvio({
  formulario,
  intentoGuardar,
  cpValido,
  alActualizar,
  alGuardar,
}) {
  return (
    <div className="p-4 pt-0 bg-white border-t border-yellow-400/30 flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 pt-4">
        <Input
          isInvalid={intentoGuardar && !formulario.nombre.trim()}
          label="Nombre completo"
          placeholder="Nombre y apellido"
          value={formulario.nombre}
          errorMessage="Ingresa solo letras."
          onValueChange={(value) => alActualizar("nombre", value)}
          variant="bordered"
          radius="sm"
          classNames={clasesCampo}
          className="col-span-2"
        />

        <Input
          isInvalid={intentoGuardar && !formulario.direccion.trim()}
          label="Dirección"
          placeholder="Calle, número, piso"
          value={formulario.direccion}
          errorMessage="Ingresá una dirección válida."
          onValueChange={(value) => alActualizar("direccion", value)}
          variant="bordered"
          radius="sm"
          classNames={clasesCampo}
          className="col-span-2"
        />

        <Input
          isInvalid={intentoGuardar && !formulario.ciudad.trim()}
          label="Ciudad"
          placeholder="Ciudad"
          value={formulario.ciudad}
          errorMessage="Ingresa solo letras."
          onValueChange={(value) => alActualizar("ciudad", value)}
          variant="bordered"
          radius="sm"
          classNames={clasesCampo}
        />

        <Input
          isInvalid={intentoGuardar && (!formulario.codigoPostal || !cpValido)}
          label="Código postal"
          placeholder="CP"
          value={formulario.codigoPostal}
          errorMessage={formulario.pais === "Argentina" ? "En Argentina debe tener 4 números." : "Ingresá solo números."}
          inputMode="numeric"
          maxLength={8}
          onValueChange={(value) => alActualizar("codigoPostal", value)}
          variant="bordered"
          radius="sm"
          classNames={clasesCampo}
        />

        <Select
          isInvalid={intentoGuardar && !formulario.pais}
          label="País"
          placeholder="Seleccioná un país"
          selectedKeys={formulario.pais ? [formulario.pais] : []}
          errorMessage="Seleccioná un país."
          onSelectionChange={(keys) => alActualizar("pais", [...keys][0] || "")}
          variant="bordered"
          radius="sm"
          classNames={clasesCampo}
          className="col-span-2"
        >
          {PAISES.map((pais) => <SelectItem key={pais}>{pais}</SelectItem>)}
        </Select>
      </div>

      <Button onPress={alGuardar} className="w-full bg-yellow-400 text-black text-sm font-bold rounded-lg mt-1">
        Guardar dirección
      </Button>
    </div>
  );
}
