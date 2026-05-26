import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { obtenerImagenProducto } from "../../../data/reglasCarrito";
import { HoverEffect } from "../../ui/card-hover-effect";
import ItemRecomendado from "./ItemRecomendado";
import RecomendadosSkeleton from "./RecomendadosSkeleton";

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

export default function ItemsRecomendados() {
  const [recomendados, setRecomendados] = useState([]);
  const [cargando, setCargando] = useState(true);
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
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarRecomendados();

    return () => {
      activo = false;
    };
  }, []);

  if (!cargando && recomendados.length === 0) return null;

  const items = recomendados.map((articulo) => ({
    title: articulo.nombre,
    role: "button",
    tabIndex: 0,
    onClick: () => navigate(`/productos/${articulo.idProducto}`),
    onKeyDown: (event) => {
      if (event.key === "Enter") navigate(`/productos/${articulo.idProducto}`);
    },
    children: <ItemRecomendado articulo={articulo} />,
  }));

  return (
    <div className="mt-8">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-green-primary mb-4">
        <Sparkles size={15} />
        Completá tu colección
      </h3>

      {cargando ? <RecomendadosSkeleton /> : <HoverEffect items={items} className="grid-cols-3 gap-1 py-0" />}
    </div>
  );
}
