import { CardProducto } from "./CardProducto";

export const ListaProductos = ({ productos }) => {
  if (productos.length === 0) {
    return (
      <p className="text-gray-400 text-sm py-4">
        No hay productos para los filtros seleccionados.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {productos.map((producto) => (
        <CardProducto key={producto.idProducto} producto={producto} />
      ))}
    </div>
  );
};