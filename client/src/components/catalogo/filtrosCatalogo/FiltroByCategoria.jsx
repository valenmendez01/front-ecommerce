import {CheckboxGroup, Checkbox, Divider} from "@heroui/react";

export const FiltroByCategoria = ({ categorias, seleccionadas, onCambiar }) => {

  const capitalizar = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <>
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
            {capitalizar(cat)}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  );
}