import { useState } from "react";
import { CheckCircle2, Truck } from "lucide-react";

import CabeceraAcordeon from "../CabeceraAcordeon";
import FormularioEnvio from "./FormularioEnvio";
import { SpotlightCard } from "../../ui/spotlight-card";

const DATOS_ENVIO = {
  Argentina: { costo: 0, digitosCp: 4 },
  Brasil: { costo: 8000, digitosCp: 8 },
  Chile: { costo: 6000, digitosCp: 7 },
  Uruguay: { costo: 4500, digitosCp: 5 },
  Paraguay: { costo: 5000, digitosCp: 4 },
  Bolivia: { costo: 5500, digitosCp: 4 },
};

const soloLetras = (valor) => valor.replace(/[^\p{L}\s]/gu, "").slice(0, 60);
const textoDireccion = (valor) => valor.replace(/[^\p{L}\d\s.,#/-]/gu, "").slice(0, 90);
const obtenerDigitosCp = (pais) => DATOS_ENVIO[pais]?.digitosCp || 8;
const soloNumeros = (valor, pais) => valor.replace(/\D/g, "").slice(0, obtenerDigitosCp(pais));

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

  const cpEsperado = obtenerDigitosCp(formulario.pais);
  const cpValido = formulario.codigoPostal.length === cpEsperado;
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
      codigoPostal: (codigoPostal) => soloNumeros(codigoPostal, formulario.pais),
      pais: (pais) => pais,
    };

    setFormulario((prev) => ({
      ...prev,
      [campo]: sanitizadores[campo](valor),
      ...(campo === "pais" ? { codigoPostal: soloNumeros(prev.codigoPostal, valor) } : {}),
    }));
  };

  const guardar = () => {
    setIntentoGuardar(true);

    if (!formularioValido) return;

    setGuardado(true);
    setAbierto(false);
    alGuardar?.({ ...formulario, costoEnvio: DATOS_ENVIO[formulario.pais].costo });
  };

  return (
    <SpotlightCard posicionLuz="derecha" className="rounded-xl border border-dorado-primary/25 shadow-sm">
      <CabeceraAcordeon
        abierto={abierto}
        guardado={guardado}
        iconoPendiente={<Truck size={18} className="text-green-primary" />}
        iconoGuardado={<CheckCircle2 size={18} className="text-green-primary" />}
        titulo="Dirección de envío"
        subtitulo="Completá tu dirección"
        subtituloGuardado={`${formulario.nombre} - ${formulario.ciudad}, ${formulario.pais}`}
        alCambiar={() => setAbierto(!abierto)}
      />

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${abierto ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"}`}>
        <FormularioEnvio
          formulario={formulario}
          datosEnvio={DATOS_ENVIO}
          intentoGuardar={intentoGuardar}
          cpValido={cpValido}
          cpEsperado={cpEsperado}
          alActualizar={actualizar}
          alGuardar={guardar}
        />
      </div>
    </SpotlightCard>
  );
}
