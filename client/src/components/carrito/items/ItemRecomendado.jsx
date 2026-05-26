import { Card } from "../../ui/card-hover-effect";
import { formatearPesos } from "../../../data/reglasProducto";
import ImagenProducto from "./ImagenProducto";

export default function ItemRecomendado({ articulo }) {
  return (
    <Card className="bg-green-primary border border-dorado-primary/25 group-hover:border-dorado-primary p-3 cursor-pointer rounded-xl">
      <ImagenProducto
        src={articulo.imagen}
        alt={articulo.nombre}
        className="w-full aspect-[3/4] rounded-lg mb-3"
        iconClassName="text-dorado-primary"
      />
      <p className="text-xs font-semibold text-white leading-tight">{articulo.nombre}</p>
      <p className="text-sm font-black text-dorado-primary mt-0.5">{formatearPesos(articulo.precio)}</p>
      <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-dorado-primary">
        Ver producto
      </p>
    </Card>
  );
}
