import { Card } from "../../ui/card-hover-effect";
import { formatearPesos } from "../../../lib/reglasProducto";
import ImagenProducto from "./ImagenProducto";

export default function ItemRecomendado({ articulo }) {
  const descuento = Number(articulo.descuento || 0);
  const precioOriginal = Number(articulo.precio || 0);
  const precioFinal = Math.round(precioOriginal * (1 - descuento / 100));

  return (
    <Card className="cursor-pointer rounded-lg border border-dorado-primary/25 bg-green-primary p-2.5 group-hover:border-dorado-primary">
      <ImagenProducto
        src={articulo.imagen}
        alt={articulo.nombre}
        className="mb-2 h-48 w-full rounded-md sm:h-40 xl:h-44"
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
      <p className="mt-1.5 text-[10px] font-black uppercase tracking-widest text-dorado-primary">
        Ver producto
      </p>
    </Card>
  );
}
