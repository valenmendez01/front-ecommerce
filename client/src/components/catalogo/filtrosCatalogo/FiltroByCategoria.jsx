import { CheckboxGroup, Checkbox } from "@heroui/react";

export const FiltroByCategoria = ({ categorias, seleccionadas, onCambiar }) => {
  const capitalizar = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <CheckboxGroup
      value={seleccionadas}
      onChange={(valoresSeleccionados) => {
        const agregada = valoresSeleccionados.find(
          (v) => !seleccionadas.includes(v)
        );
        const eliminada = seleccionadas.find(
          (v) => !valoresSeleccionados.includes(v)
        );
        onCambiar(agregada ?? eliminada);
      }}
    >
      {categorias.map((cat) => (
        <Checkbox
          key={cat}
          value={cat}
          classNames={{
            wrapper: [
              "before:border-[var(--color-dorado-primary)]",
              "after:bg-[var(--color-dorado-primary)]",
              "group-data-[selected=true]:border-[var(--color-dorado-primary)]",
            ],
            icon: "text-white",
          }}
        >
          {capitalizar(cat)}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};