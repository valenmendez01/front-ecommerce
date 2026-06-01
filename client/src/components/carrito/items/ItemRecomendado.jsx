import { Card } from "../../ui/card-hover-effect";
import { formatearPesos } from "../../../data/reglasProducto";
import ImagenProducto from "./ImagenProducto";

export default function ItemRecomendado({ articulo }) {
  const descuento = Number(articulo.descuento || 0);
  const precioOriginal = Number(articulo.precio || 0);
  const precioFinal = Math.round(precioOriginal * (1 - descuento / 100));

  return (
    <Card className="bg-green-primary border border-dorado-primary/25 group-hover:border-dorado-primary p-3 cursor-pointer rounded-xl">
      <ImagenProducto
        src={articulo.imagen}
        alt={articulo.nombre}
        className="w-full aspect-[3/4] rounded-lg mb-3"
        iconClassName="text-dorado-primary"
      />
      <p className="text-xs font-semibold text-white leading-tight">{articulo.nombre}</p>
      {descuento > 0 ? (
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-bold text-white/50 line-through">{formatearPesos(precioOriginal)}</p>
          <p className="text-sm font-black text-dorado-primary">{formatearPesos(precioFinal)}</p>
          <span className="rounded bg-dorado-primary px-1.5 py-0.5 text-[9px] font-black text-black">
            -{descuento}%
          </span>
        </div>
      ) : (
        <p className="text-sm font-black text-dorado-primary mt-0.5">{formatearPesos(precioOriginal)}</p>
      )}
      <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-dorado-primary">
        Ver producto
      </p>
    </Card>
  );
}
