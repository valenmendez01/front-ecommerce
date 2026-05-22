import { Card, Accordion, AccordionItem } from "@heroui/react";
import { FiltroByCategoria } from "./FiltroByCategoria";
import { FiltroByPrecio } from "./FiltroByPrecio";

export const Filtros = ({
  categorias,
  categoriasSeleccionadas,
  onCambiarCategoria,
  precioMin,
  precioMax,
  onPrecioChange,
}) => {
  return (
    <Card className="my-6 p-5">
      <Accordion
        selectionMode="multiple"
        defaultExpandedKeys={["categoria", "precio"]}
        variant="light"
      >
        <AccordionItem key="categoria" aria-label="Categoría" title="Categoría" className="my-2">
          <FiltroByCategoria
            categorias={categorias}
            seleccionadas={categoriasSeleccionadas}
            onCambiar={onCambiarCategoria}
          />
        </AccordionItem>

        <AccordionItem
          key="precio"
          aria-label="Rango de precio"
          title="Rango de precio"
          className="my-2"
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