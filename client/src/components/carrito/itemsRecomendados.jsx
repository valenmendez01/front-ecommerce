import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { formatearPesos } from "../../data/reglasProducto";
import { Card, HoverEffect } from "../ui/card-hover-effect";

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
  stock: Number(producto.stock ?? 0),
  subtitulo: producto.categoria || "RECOMENDADO",
});

export default function itemsRecomendados({ alAgregar }) {
  const [recomendados, setRecomendados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let activo = true;

    const cargarRecomendados = async () => {
      try {
        const respuesta = await fetch("/productos");
        const json = await respuesta.json();
        const productos = obtenerListaProductos(json.data ?? json)
          .filter((producto) => (producto?.idProducto || producto?.id) && Number(producto.stock ?? 0) > 0)
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

  const items = recomendados.map((articulo) => ({
    title: articulo.nombre,
    role: "button",
    tabIndex: 0,
    onClick: () => navigate(`/productos/${articulo.idProducto}`),
    onKeyDown: (event) => {
      if (event.key === "Enter") navigate(`/productos/${articulo.idProducto}`);
    },
    children: (
      <Card className="bg-emerald-950 border border-emerald-900 group-hover:border-yellow-400 p-3 cursor-pointer rounded-xl">
        <div className="w-full aspect-square bg-white rounded-lg mb-2 flex items-center justify-center">
          <Sparkles size={24} className="text-yellow-400" />
        </div>
        <p className="text-xs font-semibold text-white leading-tight">{articulo.nombre}</p>
        <p className="text-sm font-black text-yellow-400 mt-0.5">{formatearPesos(articulo.precio)}</p>
        <p className="text-[10px] text-white/70 font-bold mt-0.5">Stock: {articulo.stock}</p>
        <div onClick={(event) => event.stopPropagation()}>
          <Button
            size="sm"
            onPress={() => alAgregar(articulo)}
            className="mt-2 h-7 bg-yellow-400 text-black text-[10px] font-black"
          >
            + Agregar
          </Button>
        </div>
      </Card>
    ),
  }));

  return (
    <div className="mt-8">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-950 mb-4">
        <Sparkles size={15} />
        Completa tu coleccion
      </h3>

      <HoverEffect items={items} className="grid-cols-3 gap-1 py-0" />
    </div>
  );
}
