import { Button } from "@heroui/react";
import { ChevronDown } from "lucide-react";

export default function CabeceraAcordeon({
  abierto,
  guardado,
  iconoPendiente,
  iconoGuardado,
  titulo,
  subtitulo,
  subtituloGuardado,
  alCambiar,
}) {
  return (
    <Button
      onPress={alCambiar}
      variant="light"
      radius="none"
      className="w-full h-auto justify-between p-4 bg-green-primary text-left data-[hover=true]:bg-dorado-primary/15"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white">
          {guardado ? iconoGuardado : iconoPendiente}
        </div>

        <div className="text-left">
          <p className="text-sm font-black text-white">{titulo}</p>
          <p className="text-xs text-yellow-400">{guardado ? subtituloGuardado : subtitulo}</p>
        </div>
      </div>

      <ChevronDown
        size={18}
        className={`text-yellow-400 transition-transform duration-300 ${abierto ? "rotate-180" : ""}`}
      />
    </Button>
  );
}
