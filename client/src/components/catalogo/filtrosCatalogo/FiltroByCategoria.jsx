import { CheckboxGroup, Checkbox, Divider } from "@heroui/react";

export const FiltroByCategoria = ({ categorias, seleccionadas, onCambiar }) => {

  const capitalizar = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <>
      <h2>Categoría</h2>

      <Divider className="my-2" />

      <CheckboxGroup
        value={seleccionadas}
        onChange={(valoresSeleccionados) => {
          const agregada = valoresSeleccionados.find((v) => !seleccionadas.includes(v));
          const eliminada = seleccionadas.find((v) => !valoresSeleccionados.includes(v));
          onCambiar(agregada ?? eliminada);
        }}
      >
        {categorias.map((cat) => (
          <Checkbox key={cat} value={cat}>
            {capitalizar(cat)}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  );
};