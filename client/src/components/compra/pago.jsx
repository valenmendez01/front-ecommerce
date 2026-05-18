import { useState } from "react";
import { ChevronDown, CreditCard, CheckCircle2, Lock } from "lucide-react";

const formatearNumeroTarjeta = (valor) =>
  valor.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatearVencimiento = (valor) => {
  const digitos = valor.replace(/\D/g, "").slice(0, 4);
  if (digitos.length >= 3) return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
  return digitos;
};

const CampoInput = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors"
    />
  </div>
);

export default function Pago({ alGuardar }) {
  const [abierto, setAbierto] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [formulario, setFormulario] = useState({
    numero: "", titular: "", vencimiento: "", cvv: "",
  });

  const actualizar = (campo, valor) => setFormulario((prev) => ({ ...prev, [campo]: valor }));

  const numeroEnmascarado = guardado
    ? `•••• •••• •••• ${formulario.numero.replace(/\s/g, "").slice(-4)}`
    : "";

  const guardar = () => {
    const { numero, titular, vencimiento, cvv } = formulario;
    if (numero && titular && vencimiento && cvv) {
      setGuardado(true);
      setAbierto(false);
      alGuardar?.(formulario);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Encabezado */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
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
            <p className="text-sm font-bold text-gray-900">Método de Pago</p>
            {guardado ? (
              <p className="text-xs text-gray-500">
                {numeroEnmascarado} · Vence {formulario.vencimiento}
              </p>
            ) : (
              <p className="text-xs text-gray-400">Tarjeta de crédito / débito</p>
            )}
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 ${abierto ? "rotate-180" : ""}`}
        />
      </button>

      {/* Contenido desplegable */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          abierto ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <CampoInput
                label="Número de tarjeta"
                value={formulario.numero}
                onChange={(e) => actualizar("numero", formatearNumeroTarjeta(e.target.value))}
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="col-span-2">
              <CampoInput
                label="Titular de la tarjeta"
                value={formulario.titular}
                onChange={(e) => actualizar("titular", e.target.value)}
                placeholder="Como figura en la tarjeta"
              />
            </div>
            <CampoInput
              label="Vencimiento"
              value={formulario.vencimiento}
              onChange={(e) => actualizar("vencimiento", formatearVencimiento(e.target.value))}
              placeholder="MM/AA"
            />
            <CampoInput
              label="CVV"
              value={formulario.cvv}
              onChange={(e) => actualizar("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="•••"
              type="password"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
            <Lock size={12} />
            Tus datos están protegidos con encriptación SSL de 256 bits
          </div>

          <button
            onClick={guardar}
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Guardar método de pago
          </button>
        </div>
      </div>
    </div>
  );
}