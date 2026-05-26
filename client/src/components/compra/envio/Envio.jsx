import { useState } from "react";
import { CheckCircle2, Truck } from "lucide-react";

import CabeceraAcordeon from "../CabeceraAcordeon";
import FormularioEnvio from "./FormularioEnvio";
import { SpotlightCard } from "../../ui/spotlight-card";

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

  const cpValido = formulario.pais !== "Argentina" || formulario.codigoPostal.length === 4;
  const formularioValido =
    formulario.nombre.trim() &&
    formulario.direccion.trim() &&
    formulario.ciudad.trim() &&
    formulario.pais &&
    formulario.codigoPostal &&
    cpValido;

  const actualizar = (campo, valor) => {
    const sanitizadores = {
      nombre: soloLetras,
      ciudad: soloLetras,
      direccion: textoDireccion,
      codigoPostal: soloNumeros,
      pais: (pais) => pais,
    };

    setFormulario((prev) => ({ ...prev, [campo]: sanitizadores[campo](valor) }));
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
        iconoPendiente={<Truck size={18} className="text-green-primary" />}
        iconoGuardado={<CheckCircle2 size={18} className="text-green-primary" />}
        titulo="DirecciÃ³n de envÃ­o"
        subtitulo="CompletÃ¡ tu direcciÃ³n"
        subtituloGuardado={`${formulario.nombre} - ${formulario.ciudad}, ${formulario.pais}`}
        alCambiar={() => setAbierto(!abierto)}
      />

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${abierto ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"}`}>
        <FormularioEnvio
          formulario={formulario}
          intentoGuardar={intentoGuardar}
          cpValido={cpValido}
          alActualizar={actualizar}
          alGuardar={guardar}
        />
      </div>
    </SpotlightCard>
  );
}
