import { useState } from "react";
import { ChevronDown, Truck, CheckCircle2 } from "lucide-react";
import { Input, Select, SelectItem } from "@heroui/react";

const PAISES = ["Argentina", "Brasil", "Chile", "México", "España", "Estados Unidos", "Qatar"];

export default function envio({ alGuardar }) {
  const [abierto, setAbierto] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "", direccion: "", ciudad: "", pais: "", codigoPostal: "",
  });

  const actualizar = (campo, valor) => setFormulario((prev) => ({ ...prev, [campo]: valor }));

  const guardar = () => {
    const { nombre, direccion, ciudad, pais } = formulario;
    if (nombre && direccion && ciudad && pais) {
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
              <Truck size={18} className="text-blue-600" />
            )}
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">Dirección de Envío</p>
            {guardado ? (
              <p className="text-xs text-gray-500">
                {formulario.nombre} · {formulario.ciudad}, {formulario.pais}
              </p>
            ) : (
              <p className="text-xs text-gray-400">Completá tu dirección</p>
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
        <div className="p-4 pt-0 bg-white border-t border-gray-100 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Input
              label="Nombre completo"
              value={formulario.nombre}
              onChange={(e) => actualizar("nombre", e.target.value)}
              size="sm"
              classNames={{ inputWrapper: "rounded-lg" }}
              className="col-span-2"
            />
            <Input
              label="Dirección"
              value={formulario.direccion}
              onChange={(e) => actualizar("direccion", e.target.value)}
              size="sm"
              classNames={{ inputWrapper: "rounded-lg" }}
              className="col-span-2"
            />
            <Input
              label="Ciudad"
              value={formulario.ciudad}
              onChange={(e) => actualizar("ciudad", e.target.value)}
              size="sm"
              classNames={{ inputWrapper: "rounded-lg" }}
            />
            <Input
              label="Código Postal"
              value={formulario.codigoPostal}
              onChange={(e) => actualizar("codigoPostal", e.target.value)}
              size="sm"
              classNames={{ inputWrapper: "rounded-lg" }}
            />
            <Select
              label="País"
              selectedKeys={formulario.pais ? [formulario.pais] : []}
              onSelectionChange={(keys) => actualizar("pais", [...keys][0] || "")}
              size="sm"
              classNames={{ trigger: "rounded-lg" }}
              className="col-span-2"
            >
              {PAISES.map((p) => (
                <SelectItem key={p}>{p}</SelectItem>
              ))}
            </Select>
          </div>

          <button
            onClick={guardar}
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors mt-1"
          >
            Guardar dirección
          </button>
        </div>
      </div>
    </div>
  );
}