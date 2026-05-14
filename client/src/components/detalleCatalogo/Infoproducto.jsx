import { Chip } from "@heroui/react";

export const InfoProducto = ({ producto }) => {
  const { nombre, categoria, precio, descuento, description, stock, disponible } = producto;

  const precioFinal = descuento > 0 ? precio * (1 - descuento / 100) : precio;

  const formatear = (valor) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(valor);

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