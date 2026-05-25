import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { obtenerImagenProducto } from "../../data/reglasCarrito";
import { formatearPesos } from "../../data/reglasProducto";
import { Card, HoverEffect } from "../ui/card-hover-effect";
import ImagenProducto from "./imagenProducto";

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
  imagen: obtenerImagenProducto(producto),
});

export default function itemsRecomendados() {
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
        <ImagenProducto
          src={articulo.imagen}
          alt={articulo.nombre}
          className="w-full aspect-[3/4] rounded-lg mb-3"
          iconClassName="text-yellow-400"
        />
        <p className="text-xs font-semibold text-white leading-tight">{articulo.nombre}</p>
        <p className="text-sm font-black text-yellow-400 mt-0.5">{formatearPesos(articulo.precio)}</p>
        <p className="text-[10px] text-white/70 font-bold mt-0.5">Stock: {articulo.stock}</p>
        <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-yellow-400">
          Ver producto
        </p>
      </Card>
    ),
  }));

  return (
    <div className="mt-8">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-950 mb-4">
        <Sparkles size={15} />
        Completá tu colección
      </h3>

      <HoverEffect items={items} className="grid-cols-3 gap-1 py-0" />
    </div>
  );
}
