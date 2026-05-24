import { motion } from "framer-motion";
import { Pagination } from "@heroui/react";
import { CardProducto } from "./CardProducto";

export const ListaProductos = ({ productos, pagina, totalPaginas, onCambioPagina }) => {
  if (productos.length === 0) {
    return <p className="text-gray-400 text-sm py-4">No hay productos para los filtros seleccionados.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {productos.map((producto, index) => (
          <motion.div
            key={producto.idProducto}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <CardProducto producto={producto} />
          </motion.div>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex justify-center">
          <Pagination
            page={pagina}
            total={totalPaginas}
            onChange={onCambioPagina}
            showControls
            classNames={{
              cursor: "bg-[var(--color-dorado-primary)] text-white",
            }}
          />
        </div>
      )}
    </div>
  );
};