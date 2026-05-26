import { CheckboxGroup, Checkbox } from "@heroui/react";

export const FiltroBySeleccion = ({ selecciones, seleccionadas, onCambiar }) => {
  const capitalizar = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="max-h-52 overflow-y-auto pr-1">
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
      {selecciones.map((sel) => (
        <Checkbox
          key={sel}
          value={sel}
          classNames={{
            wrapper: [
              "before:border-[var(--color-dorado-primary)]",
              "after:bg-[var(--color-dorado-primary)]",
              "group-data-[selected=true]:border-[var(--color-dorado-primary)]",
            ],
            icon: "text-white",
          }}
        >
          {capitalizar(sel)}
        </Checkbox>
      ))}
    </CheckboxGroup>
    </div>
  );
};