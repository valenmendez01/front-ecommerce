import { Button, Input, Select, SelectItem } from "@heroui/react";

const clasesCampo = { label: "text-xs font-semibold text-green-primary/70" };

export default function FormularioEnvio({
  formulario,
  datosEnvio,
  intentoGuardar,
  cpValido,
  cpEsperado,
  alActualizar,
  alGuardar,
}) {
  const paises = Object.keys(datosEnvio);

  return (
    <div className="p-4 pt-0 bg-white border-t border-dorado-primary/30 flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 pt-4">
        <Input
          isInvalid={intentoGuardar && !formulario.nombre.trim()}
          label="Nombre completo"
          placeholder="Nombre y apellido"
          value={formulario.nombre}
          errorMessage="Ingresá solo letras."
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
          errorMessage="Ingresá solo letras."
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
          errorMessage={`El código postal de ${formulario.pais || "este país"} debe tener ${cpEsperado} números.`}
          inputMode="numeric"
          maxLength={cpEsperado}
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
          {paises.map((pais) => <SelectItem key={pais}>{pais}</SelectItem>)}
        </Select>
      </div>

      <Button onPress={alGuardar} className="w-full bg-dorado-primary text-black text-sm font-bold rounded-lg mt-1">
        Guardar dirección
      </Button>
    </div>
  );
}
