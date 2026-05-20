import { useState } from "react";
import { Button } from "@heroui/react";
import { ShoppingCart, Minus, Plus } from "lucide-react";

export const AccionesProducto = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const stock = producto?.stock ?? 0;

  function incrementar() {
    setCantidad((prev) => Math.min(prev + 1, stock));
  }

  function decrementar() {
    setCantidad((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function obtenerImagenPrincipal() {
    const imagen = producto?.imagenes?.[0];

    if (!imagen?.contenidoBase64) return null;

    return `data:image/jpeg;base64,${imagen.contenidoBase64}`;
  }

  function agregarAlCarrito() {
    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]");
    const id = producto.idProducto ?? producto.id;
    const precioFinal = producto.descuento > 0
      ? producto.precio * (1 - producto.descuento / 100)
      : producto.precio;

    const articulo = {
      id,
      nombre: producto.nombre,
      precio: precioFinal,
      precioOriginal: producto.descuento > 0 ? producto.precio : undefined,
      imagen: obtenerImagenPrincipal(),
      subtitulo: producto.categoria,
      cantidad,
    };

    const existe = carritoActual.find((item) => item.id === id);
    const carritoActualizado = existe
      ? carritoActual.map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: Math.min(item.cantidad + cantidad, stock),
              }
            : item
        )
      : [...carritoActual, articulo];

    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Selector de cantidad */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500">Cantidad:</p>
        <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1">
          <button onClick={decrementar} className="text-gray-500 hover:text-gray-900 transition-colors">
            <Minus size={16} />
          </button>
          <span className="w-6 text-center font-medium">{cantidad}</span>
          <button
            onClick={incrementar}
            disabled={cantidad >= stock}
            className="text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Botones */}
      <Button
        color="primary"
        size="lg"
        isDisabled={!stock}
        startContent={<ShoppingCart size={18} />}
        className="w-full font-semibold"
        onPress={agregarAlCarrito}
      >
        Agregar al carrito
      </Button>

    </div>
  );
};
