import { Button, Input, Select, SelectItem } from "@heroui/react";

const PAISES = ["Argentina", "Brasil", "Chile", "Mexico", "Espana", "Estados Unidos", "Qatar"];
const clasesCampo = { label: "text-xs font-semibold text-gray-600" };

export default function FormularioEnvio({
  formulario,
  intentoGuardar,
  cpValido,
  alActualizar,
  alGuardar,
}) {
  return (
    <div className="p-4 pt-0 bg-white border-t border-gray-100 flex flex-col gap-3">
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
          label="Direccion"
          placeholder="Calle, numero, piso"
          value={formulario.direccion}
          errorMessage="Ingresa una direccion valida."
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
          label="Codigo Postal"
          placeholder="CP"
          value={formulario.codigoPostal}
          errorMessage={formulario.pais === "Argentina" ? "En Argentina debe tener 4 numeros." : "Ingresa solo numeros."}
          inputMode="numeric"
          onValueChange={(value) => alActualizar("codigoPostal", value)}
          variant="bordered"
          radius="sm"
          classNames={clasesCampo}
        />

        <Select
          isInvalid={intentoGuardar && !formulario.pais}
          label="Pais"
          placeholder="Selecciona un pais"
          selectedKeys={formulario.pais ? [formulario.pais] : []}
          errorMessage="Selecciona un pais."
          onSelectionChange={(keys) => alActualizar("pais", [...keys][0] || "")}
          variant="bordered"
          radius="sm"
          classNames={clasesCampo}
          className="col-span-2"
        >
          {PAISES.map((pais) => <SelectItem key={pais}>{pais}</SelectItem>)}
        </Select>
      </div>

      <Button onPress={alGuardar} className="w-full bg-gray-900 text-white text-sm font-bold rounded-lg mt-1">
        Guardar direccion
      </Button>
    </div>
  );
}
