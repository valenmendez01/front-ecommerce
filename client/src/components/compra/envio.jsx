import { useState } from "react";
import { ChevronDown, Truck, CheckCircle2 } from "lucide-react";
import { Button, Input, Select, SelectItem } from "@heroui/react";

const PAISES = ["Argentina", "Brasil", "Chile", "Mexico", "Espana", "Estados Unidos", "Qatar"];

const soloLetras = (valor) => valor.replace(/[^\p{L}\s]/gu, "").slice(0, 60);
const textoDireccion = (valor) => valor.replace(/[^\p{L}\d\s.,#/-]/gu, "").slice(0, 90);
const soloNumeros = (valor) => valor.replace(/\D/g, "").slice(0, 8);

export default function Envio({ alGuardar }) {
  const [abierto, setAbierto] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [intentoGuardar, setIntentoGuardar] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    pais: "",
    codigoPostal: "",
  });

  const actualizar = (campo, valor) => setFormulario((prev) => ({ ...prev, [campo]: valor }));
  const cpValido = formulario.pais !== "Argentina" || formulario.codigoPostal.length === 4;
  const formularioValido =
    formulario.nombre.trim() &&
    formulario.direccion.trim() &&
    formulario.ciudad.trim() &&
    formulario.pais &&
    formulario.codigoPostal &&
    cpValido;

  const guardar = () => {
    setIntentoGuardar(true);

    if (formularioValido) {
      setGuardado(true);
      setAbierto(false);
      alGuardar?.(formulario);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <Button
        onPress={() => setAbierto(!abierto)}
        variant="light"
        radius="none"
        className="w-full h-auto justify-between p-4 bg-white text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${guardado ? "bg-green-100" : "bg-blue-50"}`}>
            {guardado ? (
              <CheckCircle2 size={18} className="text-green-600" />
            ) : (
              <Truck size={18} className="text-blue-600" />
            )}
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">Direccion de Envio</p>
            {guardado ? (
              <p className="text-xs text-gray-500">
                {formulario.nombre} - {formulario.ciudad}, {formulario.pais}
              </p>
            ) : (
              <p className="text-xs text-gray-400">Completa tu direccion</p>
            )}
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 ${abierto ? "rotate-180" : ""}`}
        />
      </Button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          abierto ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 pt-0 bg-white border-t border-gray-100 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Input
              isInvalid={intentoGuardar && !formulario.nombre.trim()}
              label="Nombre completo"
              labelPlacement="inside"
              placeholder="Nombre y apellido"
              value={formulario.nombre}
              errorMessage="Ingresa solo letras."
              onValueChange={(value) => actualizar("nombre", soloLetras(value))}
              variant="bordered"
              radius="sm"
              classNames={{ label: "text-xs font-semibold text-gray-600" }}
              className="col-span-2"
            />
            <Input
              isInvalid={intentoGuardar && !formulario.direccion.trim()}
              label="Direccion"
              labelPlacement="inside"
              placeholder="Calle, numero, piso"
              value={formulario.direccion}
              errorMessage="Ingresa una direccion valida."
              onValueChange={(value) => actualizar("direccion", textoDireccion(value))}
              variant="bordered"
              radius="sm"
              className="col-span-2"
            />
            <Input
              isInvalid={intentoGuardar && !formulario.ciudad.trim()}
              label="Ciudad"
              labelPlacement="inside"
              placeholder="Ciudad"
              value={formulario.ciudad}
              errorMessage="Ingresa solo letras."
              onValueChange={(value) => actualizar("ciudad", soloLetras(value))}
              variant="bordered"
              radius="sm"
              classNames={{ label: "text-xs font-semibold text-gray-600" }}
            />
            <Input
              isInvalid={intentoGuardar && (!formulario.codigoPostal || !cpValido)}
              label="Codigo Postal"
              labelPlacement="inside"
              placeholder="CP"
              value={formulario.codigoPostal}
              errorMessage={formulario.pais === "Argentina" ? "En Argentina debe tener 4 numeros." : "Ingresa solo numeros."}
              inputMode="numeric"
              onValueChange={(value) => actualizar("codigoPostal", soloNumeros(value))}
              variant="bordered"
              radius="sm"
              classNames={{ label: "text-xs font-semibold text-gray-600" }}
            />
            <Select
              isInvalid={intentoGuardar && !formulario.pais}
              label="Pais"
              labelPlacement="inside"
              placeholder="Selecciona un pais"
              selectedKeys={formulario.pais ? [formulario.pais] : []}
              errorMessage="Selecciona un pais."
              onSelectionChange={(keys) => actualizar("pais", [...keys][0] || "")}
              variant="bordered"
              radius="sm"
              classNames={{ label: "text-xs font-semibold text-gray-600" }}
              className="col-span-2"
            >
              {PAISES.map((pais) => (
                <SelectItem key={pais}>{pais}</SelectItem>
              ))}
            </Select>
          </div>

          <Button
            onPress={guardar}
            className="w-full bg-gray-900 text-white text-sm font-bold rounded-lg mt-1"
          >
            Guardar direccion
          </Button>
        </div>
      </div>
    </div>
  );
}
