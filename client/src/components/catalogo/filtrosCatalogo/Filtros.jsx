import { Card, Accordion, AccordionItem } from "@heroui/react";
import { FiltroByCategoria } from "./FiltroByCategoria";
import { FiltroByPrecio } from "./FiltroByPrecio";
import { FiltroBySeleccion } from "./FiltroBySeleccion";

export const Filtros = ({
  categorias,
  categoriasSeleccionadas,
  onCambiarCategoria,
  selecciones,
  seleccionesSeleccionadas,
  onCambiarSeleccion,
  precioMin,
  precioMax,
  onPrecioChange,
}) => {
  return (
    <Card className="my-6 px-5 py-2">
      <Accordion
        selectionMode="multiple"
        defaultExpandedKeys={["categoria"]}
        variant="light"
      >
        <AccordionItem 
          key="categoria"
          aria-label="Categoría"
          title="Categoría"
          className="my-2"
          classNames={{ title: "font-semibold text-lg", trigger: "cursor-pointer" }}
        >
          <FiltroByCategoria
            categorias={categorias}
            seleccionadas={categoriasSeleccionadas}
            onCambiar={onCambiarCategoria}
          />
        </AccordionItem>

        <AccordionItem 
          key="seleccion"
          aria-label="Selección"
          title="Selección"
          className="my-2"
          classNames={{ title: "font-semibold text-lg", trigger: "cursor-pointer" }}
        >
          <FiltroBySeleccion
            selecciones={selecciones}
            seleccionadas={seleccionesSeleccionadas}
            onCambiar={onCambiarSeleccion}
          />
        </AccordionItem>

        <AccordionItem
          key="precio"
          aria-label="Rango de precio"
          title="Rango de precio"
          className="my-2"
          classNames={{ title: "font-semibold text-lg", trigger: "cursor-pointer" }}
        >
          <FiltroByPrecio
            precioMin={precioMin}
            precioMax={precioMax}
            onChange={onPrecioChange}
          />
        </AccordionItem>
      </Accordion>
    </Card>
  );
};