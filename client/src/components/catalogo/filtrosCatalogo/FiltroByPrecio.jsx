import { Divider, Slider } from "@heroui/react";
import { cn } from "../../../lib/utils";

export const FiltroByPrecio = ({ precioMin, precioMax, onChange }) => {

  function handleChange([min, max]) {
    onChange("min", min);
    onChange("max", max);
  }

  return (
    <div className="mt-4">
      <h2>Rango de precio</h2>

      <Divider className="my-2" />

      <Slider
        classNames={{
          base: "max-w-md gap-3",
          filler: "bg-linear-to-r from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800",
        }}
        className="max-w-md"
        label="Precio"
        minValue={0}
        maxValue={20000}
        step={500}
        value={[precioMin, precioMax]}
        onChange={handleChange}
        formatOptions={{ style: "currency", currency: "ARS" }}
        renderThumb={({index, ...props}) => (
          <div
            {...props}
            className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
          >
            <span
              className={cn(
                "transition-transform bg-linear-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
                index === 0
                  ? "from-pink-200 to-pink-500 dark:from-pink-400 dark:to-pink-600" // first thumb
                  : "from-cyan-200 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800", // second thumb
              )}
            />
          </div>
        )}
      />
    </div>
  );
}
