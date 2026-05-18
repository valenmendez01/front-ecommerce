
import { Card } from "@heroui/react";
import { FiltroByCategoria } from "./FiltroByCategoria";
import { FiltroByPrecio } from "./FiltroByPrecio";

export const Filtros = ({ categorias, categoriasSeleccionadas, onCambiarCategoria, precioMin, precioMax, onPrecioChange, }) => {
  return (
    <Card className="my-2 p-6">
      <FiltroByCategoria
        categorias={categorias}
        seleccionadas={categoriasSeleccionadas}
        onCambiar={onCambiarCategoria}
      />

      <div className="mt-8">
        <FiltroByPrecio 
          precioMin={precioMin}
          precioMax={precioMax}
          onChange={onPrecioChange}
        />
      </div>
    </Card>
  );
}