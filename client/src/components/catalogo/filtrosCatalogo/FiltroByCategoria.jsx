import {CheckboxGroup, Checkbox, Divider} from "@heroui/react";

export const FiltroByCategoria = ({ categorias, seleccionadas, onCambiar }) => {
  return (
    <div className="mt-4">
      <h2>Categoría</h2>

      <Divider className="my-2" />
    
      <CheckboxGroup>
        {categorias.map((cat) => (
          <Checkbox
            key={cat}
            value={cat}
            isSelected={seleccionadas.includes(cat)}
            onChange={() => onCambiar(cat)}
          >
            {cat}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}