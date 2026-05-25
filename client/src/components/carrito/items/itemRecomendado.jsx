import { Card } from "../../ui/card-hover-effect";
import { formatearPesos } from "../../../data/reglasProducto";
import ImagenProducto from "./imagenProducto";

export default function ItemRecomendado({ articulo }) {
  return (
    <Card className="bg-green-primary border border-dorado-primary/25 group-hover:border-yellow-400 p-3 cursor-pointer rounded-xl">
      <ImagenProducto
        src={articulo.imagen}
        alt={articulo.nombre}
        className="w-full aspect-[3/4] rounded-lg mb-3"
        iconClassName="text-yellow-400"
      />
      <p className="text-xs font-semibold text-white leading-tight">{articulo.nombre}</p>
      <p className="text-sm font-black text-yellow-400 mt-0.5">{formatearPesos(articulo.precio)}</p>
      <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-yellow-400">
        Ver producto
      </p>
    </Card>
  );
}
