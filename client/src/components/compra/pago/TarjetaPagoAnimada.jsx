import { motion } from "framer-motion";
import { obtenerMarcaTarjeta } from "../../../lib/useFormularioPago";

const estilosMarca = {
  generica: "from-zinc-800 via-zinc-700 to-zinc-900",
  visa: "from-[#142f78] via-[#1f5fbf] to-[#081a45]",
  mastercard: "from-[#2a1616] via-[#412117] to-[#100b0b]",
};

const LogoTarjeta = ({ marca }) => {
  if (marca === "visa") return <span className="text-xl font-black italic tracking-tight text-white">VISA</span>;

  if (marca === "mastercard") {
    return (
      <div className="flex items-center">
        <span className="h-7 w-7 rounded-full bg-[#eb001b]" />
        <span className="-ml-3 h-7 w-7 rounded-full bg-[#f79e1b] mix-blend-screen" />
      </div>
    );
  }

  return <span className="text-xs font-black uppercase tracking-[0.28em] text-white/70">Figullect Card</span>;
};

export default function TarjetaPagoAnimada({ cvvActivo, formulario }) {
  const marca = obtenerMarcaTarjeta(formulario.numero.replace(/\D/g, "")) || "generica";
  const numeroVisible = formulario.numero || "**** **** **** ****";
  const titularVisible = formulario.titular || "Nombre y apellido";
  const vencimientoVisible = formulario.vencimiento || "MM/AA";

  return (
    <motion.div
      animate={{ rotateY: cvvActivo ? 180 : 0, y: marca === "generica" ? 0 : [0, -8, 0] }}
      className="relative mx-auto h-36 w-full max-w-xs [transform-style:preserve-3d]"
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className={`absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br ${estilosMarca[marca]} p-4 text-white shadow-xl [backface-visibility:hidden]`}>
        <div className="flex items-start justify-between">
          <LogoTarjeta marca={marca} />
          <span className="rounded-full border border-dorado-primary/60 px-2 py-1 text-[10px] font-black text-dorado-primary">
            ARS
          </span>
        </div>

        <p className="font-mono text-base font-bold tracking-[0.14em]">{numeroVisible}</p>

        <div className="flex justify-between gap-4 text-[11px] font-bold uppercase tracking-wider text-white/80">
          <span className="truncate">{titularVisible}</span>
          <span>{vencimientoVisible}</span>
        </div>
      </div>

      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${estilosMarca[marca]} p-4 text-white shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]`}>
        <div className="mt-4 h-8 rounded bg-black/70" />
        <div className="mt-6 flex items-center justify-end gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-white/60">CVV</span>
          <span className="rounded bg-white px-4 py-2 font-mono text-sm font-black text-black">
            {formulario.cvv || "***"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
