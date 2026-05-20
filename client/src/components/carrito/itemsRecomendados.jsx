import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@heroui/react";

import { apiRequest } from "../../lib/api";
import { formatearPesos } from "../../lib/formatters";

const obtenerListaProductos = (respuesta) => {
  if (Array.isArray(respuesta)) return respuesta;
  if (Array.isArray(respuesta?.content)) return respuesta.content;
  return [];
};

const tomarAleatorios = (productos, cantidad) =>
  [...productos].sort(() => Math.random() - 0.5).slice(0, cantidad);

const normalizarProducto = (producto) => ({
  ...producto,
  id: producto.idProducto ?? producto.id,
  idProducto: producto.idProducto ?? producto.id,
  precio: Number(producto.precio ?? 0),
  subtitulo: producto.categoria || "RECOMENDADO",
});

export default function itemsRecomendados({ alAgregar }) {
  const [recomendados, setRecomendados] = useState([]);

  useEffect(() => {
    let activo = true;

    const cargarRecomendados = async () => {
      try {
        const respuesta = await apiRequest("/productos", { auth: false });
        const productos = obtenerListaProductos(respuesta)
          .filter((producto) => producto?.idProducto || producto?.id)
          .map(normalizarProducto);

        if (activo) {
          setRecomendados(tomarAleatorios(productos, 3));
        }
      } catch {
        if (activo) {
          setRecomendados([]);
        }
      }
    };

    cargarRecomendados();

    return () => {
      activo = false;
    };
  }, []);

  if (recomendados.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">
        <Sparkles size={15} />
        Completa tu coleccion
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {recomendados.map((articulo) => (
          <Button
            key={articulo.id}
            onPress={() => alAgregar(articulo)}
            variant="bordered"
            className="group h-auto min-h-0 flex-col items-stretch bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-left hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-full aspect-square bg-gray-900 rounded-lg mb-2 flex items-center justify-center">
              <Sparkles size={24} className="text-yellow-400" />
            </div>
            <p className="text-xs font-semibold text-gray-800 leading-tight">{articulo.nombre}</p>
            <p className="text-sm font-black text-green-600 mt-0.5">{formatearPesos(articulo.precio)}</p>
            <span className="text-[10px] text-blue-600 font-bold group-hover:underline">
              + Agregar
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
