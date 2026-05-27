import { Button } from "@heroui/react";

export default function ControlesCantidad({ cantidad, stock, alRestar, alSumar }) {
  const sinMasStock = stock && cantidad >= stock;

  return (
    <div className="flex items-center border border-dorado-primary/50 rounded-lg overflow-hidden bg-white">
      <Button
        isIconOnly
        size="sm"
        variant="light"
        radius="none"
        onPress={alRestar}
        className="min-w-8 h-8 text-black text-sm font-bold"
      >
        -
      </Button>
      <span className="px-3 py-1 text-sm font-semibold text-black border-x border-dorado-primary/40">
        {cantidad}
      </span>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        radius="none"
        isDisabled={sinMasStock}
        onPress={alSumar}
        className="min-w-8 h-8 text-black text-sm font-bold"
      >
        +
      </Button>
    </div>
  );
}
