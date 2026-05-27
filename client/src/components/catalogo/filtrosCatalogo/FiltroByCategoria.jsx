import { CheckboxGroup, Checkbox } from "@heroui/react";

export const FiltroByCategoria = ({ categorias, seleccionadas, onCambiar }) => {
  
  const formatearTexto = (str) => {
    const textoSinGuiones = str.replace(/_/g, " ");
    return textoSinGuiones.charAt(0).toUpperCase() + textoSinGuiones.slice(1).toLowerCase();
  };

  return (
    <CheckboxGroup
      value={seleccionadas}
      onChange={onCambiar}
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
          {formatearTexto(cat)}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};