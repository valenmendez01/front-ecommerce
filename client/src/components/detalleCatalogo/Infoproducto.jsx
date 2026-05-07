import { Chip } from "@heroui/react";
import { CheckCircle, Truck, RotateCcw } from "lucide-react";

const ICONOS_TAGS = [Truck, CheckCircle, RotateCcw];

export const InfoProducto = ({ producto }) => {
  const { nombre, categoria, precio, precioOriginal, descripcion, stock, tags } = producto;

  const descuento = Math.round((1 - precio / precioOriginal) * 100);

  return (
    <div className="flex flex-col gap-5">

      {/* Categoría */}
      <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">
        {categoria}
      </p>

      {/* Nombre */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
        {nombre}
      </h1>

      {/* Precios */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(precio)}
        </span>
        <span className="text-gray-400 line-through text-sm">
          {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(precioOriginal)}
        </span>
        <Chip color="danger" size="sm" variant="flat">
          {descuento}% OFF
        </Chip>
      </div>

      {/* Descripción */}
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
        {descripcion}
      </p>

      {/* Stock */}
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${stock ? "bg-green-500" : "bg-red-500"}`} />
        <p className={`text-sm font-medium ${stock ? "text-green-600" : "text-red-500"}`}>
          {stock ? "En stock · Listo para despachar" : "Sin stock"}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-2">
        {tags.map((tag, index) => {
          const Icono = ICONOS_TAGS[index] ?? CheckCircle;
          return (
            <div key={tag} className="flex items-center gap-2 text-sm text-gray-500">
              <Icono size={16} className="text-gray-400" />
              {tag}
            </div>
          );
        })}
      </div>

    </div>
  );
};