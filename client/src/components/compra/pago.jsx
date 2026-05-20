import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { ChevronDown, CreditCard, CheckCircle2, Lock } from "lucide-react";

const formatearNumeroTarjeta = (valor) =>
  valor.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatearVencimiento = (valor) => {
  const digitos = valor.replace(/\D/g, "").slice(0, 4);
  if (digitos.length >= 3) return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
  return digitos;
};

const soloLetras = (valor) => valor.replace(/[^\p{L}\s]/gu, "").slice(0, 60);
const soloCvv = (valor) => valor.replace(/\D/g, "").slice(0, 4);

export default function Pago({ alGuardar }) {
  const [abierto, setAbierto] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [intentoGuardar, setIntentoGuardar] = useState(false);
  const [formulario, setFormulario] = useState({
    numero: "",
    titular: "",
    vencimiento: "",
    cvv: "",
  });

  const actualizar = (campo, valor) => setFormulario((prev) => ({ ...prev, [campo]: valor }));
  const digitosTarjeta = formulario.numero.replace(/\s/g, "");
  const digitosVencimiento = formulario.vencimiento.replace(/\D/g, "");
  const numeroValido = digitosTarjeta.length === 16;
  const titularValido = formulario.titular.trim().length >= 3;
  const vencimientoValido = digitosVencimiento.length === 4;
  const cvvValido = formulario.cvv.length >= 3 && formulario.cvv.length <= 4;
  const formularioValido = numeroValido && titularValido && vencimientoValido && cvvValido;

  const numeroEnmascarado = guardado
    ? `**** **** **** ${digitosTarjeta.slice(-4)}`
    : "";

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
              <CreditCard size={18} className="text-blue-600" />
            )}
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">Metodo de Pago</p>
            {guardado ? (
              <p className="text-xs text-gray-500">
                {numeroEnmascarado} - Vence {formulario.vencimiento}
              </p>
            ) : (
              <p className="text-xs text-gray-400">Tarjeta de credito / debito</p>
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
          abierto ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              isInvalid={intentoGuardar && !numeroValido}
              label="Numero de tarjeta"
              labelPlacement="inside"
              placeholder="0000 0000 0000 0000"
              value={formulario.numero}
              errorMessage="La tarjeta debe tener 16 numeros."
              inputMode="numeric"
              onValueChange={(value) => actualizar("numero", formatearNumeroTarjeta(value))}
              variant="bordered"
              radius="sm"
              classNames={{ label: "text-xs font-semibold text-gray-600" }}
              className="col-span-2"
            />
            <Input
              isInvalid={intentoGuardar && !titularValido}
              label="Titular de la tarjeta"
              labelPlacement="inside"
              placeholder="Como figura en la tarjeta"
              value={formulario.titular}
              errorMessage="Ingresa solo letras."
              onValueChange={(value) => actualizar("titular", soloLetras(value))}
              variant="bordered"
              radius="sm"
              classNames={{ label: "text-xs font-semibold text-gray-600" }}
              className="col-span-2"
            />
            <Input
              isInvalid={intentoGuardar && !vencimientoValido}
              label="Vencimiento"
              labelPlacement="inside"
              placeholder="MM/AA"
              value={formulario.vencimiento}
              errorMessage="Usa el formato MM/AA."
              inputMode="numeric"
              onValueChange={(value) => actualizar("vencimiento", formatearVencimiento(value))}
              variant="bordered"
              radius="sm"
              classNames={{ label: "text-xs font-semibold text-gray-600" }}
            />
            <Input
              isInvalid={intentoGuardar && !cvvValido}
              label="CVV"
              labelPlacement="inside"
              placeholder="123"
              type="password"
              value={formulario.cvv}
              errorMessage="El CVV debe tener 3 o 4 numeros."
              inputMode="numeric"
              onValueChange={(value) => actualizar("cvv", soloCvv(value))}
              variant="bordered"
              radius="sm"
              classNames={{ label: "text-xs font-semibold text-gray-600" }}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
            <Lock size={12} />
            Tus datos estan protegidos con encriptacion SSL de 256 bits
          </div>

          <Button
            onPress={guardar}
            className="w-full bg-gray-900 text-white text-sm font-bold rounded-lg"
          >
            Guardar metodo de pago
          </Button>
        </div>
      </div>
    </div>
  );
}
