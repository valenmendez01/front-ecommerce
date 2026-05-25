import { useState } from "react";
import { CheckCircle2, CreditCard } from "lucide-react";

import CabeceraAcordeon from "./cabeceraAcordeon";
import FormularioPago from "./formularioPago";
import { SpotlightCard } from "../ui/spotlight-card";

const formatearNumeroTarjeta = (valor) =>
  valor.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatearVencimiento = (valor) => {
  const digitos = valor.replace(/\D/g, "").slice(0, 4);
  return digitos.length >= 3 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos;
};

const soloLetras = (valor) => valor.replace(/[^\p{L}\s]/gu, "").slice(0, 60);
const soloCvv = (valor) => valor.replace(/\D/g, "").slice(0, 4);

const vencimientoValido = (valor) => {
  const digitos = valor.replace(/\D/g, "");
  if (digitos.length !== 4) return false;

  const mes = Number(digitos.slice(0, 2));
  const anio = 2000 + Number(digitos.slice(2));
  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1;

  if (mes < 1 || mes > 12) return false;

  return anio > anioActual || (anio === anioActual && mes >= mesActual);
};

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

  const digitosTarjeta = formulario.numero.replace(/\s/g, "");
  const validaciones = {
    numeroValido: digitosTarjeta.length === 16,
    titularValido: formulario.titular.trim().length >= 3,
    vencimientoValido: vencimientoValido(formulario.vencimiento),
    cvvValido: formulario.cvv.length >= 3 && formulario.cvv.length <= 4,
  };
  const formularioValido = Object.values(validaciones).every(Boolean);

  const actualizar = (campo, valor) => {
    const formateadores = {
      numero: formatearNumeroTarjeta,
      titular: soloLetras,
      vencimiento: formatearVencimiento,
      cvv: soloCvv,
    };

    setFormulario((prev) => ({ ...prev, [campo]: formateadores[campo](valor) }));
  };

  const guardar = () => {
    setIntentoGuardar(true);

    if (!formularioValido) return;

    setGuardado(true);
    setAbierto(false);
    alGuardar?.(formulario);
  };

  return (
    <SpotlightCard posicionLuz="derecha" className="rounded-xl border border-dorado-primary/25 shadow-sm">
      <CabeceraAcordeon
        abierto={abierto}
        guardado={guardado}
        iconoPendiente={<CreditCard size={18} className="text-emerald-950" />}
        iconoGuardado={<CheckCircle2 size={18} className="text-emerald-950" />}
        titulo="Método de pago"
        subtitulo="Tarjeta de crédito / débito"
        subtituloGuardado={`**** **** **** ${digitosTarjeta.slice(-4)} - Vence ${formulario.vencimiento}`}
        alCambiar={() => setAbierto(!abierto)}
      />

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${abierto ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"}`}>
        <FormularioPago
          formulario={formulario}
          intentoGuardar={intentoGuardar}
          validaciones={validaciones}
          alActualizar={actualizar}
          alGuardar={guardar}
        />
      </div>
    </SpotlightCard>
  );
}
