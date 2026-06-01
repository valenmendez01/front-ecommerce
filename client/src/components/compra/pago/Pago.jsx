import { useState } from "react";
import { CheckCircle2, CreditCard } from "lucide-react";

import CabeceraAcordeon from "../CabeceraAcordeon";
import FormularioPago from "./FormularioPago";
import { SpotlightCard } from "../../ui/spotlight-card";

const obtenerMarcaTarjeta = (digitos) => {
  if (/^4/.test(digitos)) return "visa";
  if (/^5[1-5]/.test(digitos)) return "mastercard";
  if (digitos.length >= 4) {
    const prefijo = Number(digitos.slice(0, 4));
    if (prefijo >= 2221 && prefijo <= 2720) return "mastercard";
  }
  return "";
};

const formatearNumeroTarjeta = (valor, numeroActual = "") => {
  const digitos = valor.replace(/\D/g, "").slice(0, 16);
  if (digitos.length > 4 && !obtenerMarcaTarjeta(digitos)) return numeroActual;
  return digitos.replace(/(.{4})/g, "$1 ").trim();
};

const formatearVencimiento = (valor) => {
  const digitos = valor.replace(/\D/g, "").slice(0, 4);
  return digitos.length >= 3 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos;
};

const soloLetras = (valor) => valor.replace(/[^\p{L}\s]/gu, "").slice(0, 60);
const soloCvv = (valor) => valor.replace(/\D/g, "").slice(0, 3);

const vencimientoValido = (valor) => {
  const digitos = valor.replace(/\D/g, "");
  if (digitos.length !== 4) return false;
  const mes = Number(digitos.slice(0, 2));
  const anio = 2000 + Number(digitos.slice(2));
  const hoy = new Date();
  if (mes < 1 || mes > 12) return false;
  return anio > hoy.getFullYear() || (anio === hoy.getFullYear() && mes >= hoy.getMonth() + 1);
};

export default function Pago({ alGuardar }) {
  const [abierto, setAbierto] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [intentoGuardar, setIntentoGuardar] = useState(false);
  const [formulario, setFormulario] = useState({ numero: "", titular: "", vencimiento: "", cvv: "" });
  const digitosTarjeta = formulario.numero.replace(/\s/g, "");
  const tarjetaSoportada = digitosTarjeta.length < 4 || Boolean(obtenerMarcaTarjeta(digitosTarjeta));
  const validaciones = {
    numeroValido: digitosTarjeta.length === 16 && tarjetaSoportada,
    tarjetaSoportada,
    titularValido: formulario.titular.trim().length >= 3,
    vencimientoValido: vencimientoValido(formulario.vencimiento),
    cvvValido: formulario.cvv.length === 3,
  };
  const formularioValido = Object.values(validaciones).every(Boolean);
  const metodoVisible = `**** **** **** ${digitosTarjeta.slice(-4)} - Vence ${formulario.vencimiento}`;

  const actualizar = (campo, valor) => {
    const formateadores = {
      numero: (nuevoValor, actual) => formatearNumeroTarjeta(nuevoValor, actual),
      titular: soloLetras,
      vencimiento: formatearVencimiento,
      cvv: soloCvv,
    };
    setFormulario((prev) => ({ ...prev, [campo]: formateadores[campo](valor, prev[campo]) }));
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
        iconoPendiente={<CreditCard size={18} className="text-green-primary" />}
        iconoGuardado={<CheckCircle2 size={18} className="text-green-primary" />}
        titulo="Metodo de pago"
        subtitulo="Tarjeta de credito / debito"
        subtituloGuardado={metodoVisible}
        alCambiar={() => setAbierto(!abierto)}
      />

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${abierto ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"}`}>
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
