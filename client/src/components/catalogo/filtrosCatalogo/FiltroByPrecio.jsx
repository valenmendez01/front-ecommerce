import { Slider } from "@heroui/react";

export const FiltroByPrecio = ({ precioMin, precioMax, onChange }) => {
  function handleChange([min, max]) {
    onChange("min", min);
    onChange("max", max);
  }

  return (
    <Slider
      classNames={{
        base: "max-w-md",
        filler: "bg-[var(--color-dorado-primary)]",
        labelWrapper: "mb-2",
        label: "font-medium text-default-700 text-medium",
        value: "font-medium text-default-500 text-small",
        thumb: [
          "transition-size",
          "bg-[var(--color-dorado-primary)]",
          "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
          "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
        ],
        step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
      }}
      disableThumbScale={true}
      formatOptions={{ style: "currency", currency: "ARS" }}
      label="Precio"
      minValue={0}
      maxValue={20000}
      step={500}
      value={[precioMin, precioMax]}
      onChange={handleChange}
      showOutline={true}
      showSteps={false}
      showTooltip={true}
      tooltipProps={{
        offset: 10,
        placement: "bottom",
        classNames: {
          base: [
            "before:bg-[var(--color-dorado-primary)]",
          ],
          content: [
            "py-2 shadow-xl",
            "text-white bg-[var(--color-dorado-primary)]",
          ],
        },
      }}
      tooltipValueFormatOptions={{
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }}
    />
  );
};