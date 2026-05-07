
import { FiltroByCategoria } from "./FiltroByCategoria";
import { FiltroByPrecio } from "./FiltroByPrecio";

export const Filtros = ({ categorias, categoriasSeleccionadas, onCambiarCategoria, precioMin, precioMax, onPrecioChange, }) => {
  return (
    <div className="my-4">
      <FiltroByCategoria
        categorias={categorias}
        seleccionadas={categoriasSeleccionadas}
        onCambiar={onCambiarCategoria}
      />

      <div className="mt-16">
        <FiltroByPrecio 
          precioMin={precioMin}
          precioMax={precioMax}
          onChange={onPrecioChange}
        />
      </div>
    </div>
  );
}