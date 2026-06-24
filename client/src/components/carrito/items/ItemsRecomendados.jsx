import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { HoverEffect } from "../../ui/card-hover-effect";
import ItemRecomendado from "./ItemRecomendado";
import RecomendadosSkeleton from "./RecomendadosSkeleton";
import { fetchRecomendadosCarrito } from "../../../redux/recomendadosCarritoSlice";

const obtenerIdsCarrito = (articulos) =>
  articulos.map((articulo) => articulo.idProducto ?? articulo.id).join(",");

export default function ItemsRecomendados({ articulosCarrito = [] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const idsCarrito = obtenerIdsCarrito(articulosCarrito);
  const { cargando, productos: recomendados } = useSelector((state) => state.recomendadosCarrito);

  useEffect(() => {
    dispatch(fetchRecomendadosCarrito(idsCarrito));
  }, [dispatch, idsCarrito]);

  if (!cargando && recomendados.length === 0) return null;

  const items = recomendados.map((articulo) => ({
    title: articulo.nombre,
    role: "button",
    tabIndex: 0,
    onClick: () => navigate(`/productos/${articulo.idProducto}`),
    onKeyDown: (event) => event.key === "Enter" && navigate(`/productos/${articulo.idProducto}`),
    children: <ItemRecomendado articulo={articulo} />,
  }));

  return (
    <section className="mt-4">
      <h3 className="mb-2 flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-widest text-green-primary">
        <Sparkles size={15} />
        Completá tu colección
      </h3>

      {cargando ? (
        <RecomendadosSkeleton />
      ) : (
        <HoverEffect items={items} className="grid-cols-1 gap-2 py-0 sm:grid-cols-3" />
      )}
    </section>
  );
}
