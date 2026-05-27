import { Chip } from "@heroui/react";
import { Button } from "@heroui/react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatearCategoria = (categoria = "") => {
  const etiquetas = {
    COCA_COLA: "Coca-Cola",
    EXTRA_STICKERS: "Extra Stickers",
  };

  return etiquetas[categoria] || categoria;
};

export const InfoProducto = ({ producto }) => {
  const { nombre, categoria, precio, descuento, description, stock, disponible } = producto;
  const navigate = useNavigate();

  const precioFinal = descuento > 0 ? precio * (1 - descuento / 100) : precio;

  const formatear = (valor) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(valor);

  return (
    <div className="flex flex-col gap-5">

      {/* Categoría + Volver */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-widest text-dorado-primary uppercase">
          {formatearCategoria(categoria)}
        </p>
        <Button
          onPress={() => navigate(-1)}
          variant="outline"
          startContent={<ChevronLeft size={20} />}
          className="text-dorado-primary"
        >
          Volver
        </Button>
      </div>

      {/* Nombre */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
        {nombre}
      </h1>

      {/* Precios */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatear(precioFinal)}
        </span>
        {descuento > 0 && (
          <>
            <span className="text-sm text-gray-400 line-through">
              {formatear(precio)}
            </span>
            <Chip color="danger" size="sm" variant="flat">
              {descuento}% OFF
            </Chip>
          </>
        )}
      </div>

      {/* Descripción */}
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>

      {/* Stock */}
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${disponible ? "bg-green-500" : "bg-red-500"}`} />
        <p className={`text-sm font-medium ${disponible ? "text-green-600" : "text-red-500"}`}>
          {disponible ? `En stock · ${stock} disponibles` : "Sin stock"}
        </p>
      </div>

    </div>
  );
};
