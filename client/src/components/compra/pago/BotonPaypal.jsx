import { Button } from "@heroui/react";

export default function BotonPaypal({ alPagar, cargando, puedePagar }) {
  const texto = cargando
    ? "Conectando con PayPal..."
    : "Pagar con PayPal";

  return (
    <div className="flex flex-col gap-2">
      <Button
        onPress={alPagar}
        isDisabled={cargando}
        className={`w-full rounded-xl border text-sm font-black uppercase tracking-wider transition-colors ${
          !cargando
            ? "border-[#003087] bg-[#003087] text-white hover:bg-[#0070ba]"
            : "border-[#003087]/70 bg-[#003087] text-white/70 opacity-80"
        }`}
      >
        {texto}
      </Button>

      <p className="text-center text-[11px] font-medium text-green-primary/70">
        PayPal procesa el pago en dólares.
      </p>

      {!puedePagar && !cargando && (
        <p className="text-center text-[11px] font-medium text-green-primary/70">
          Te vamos a pedir la dirección antes de redirigirte.
        </p>
      )}
    </div>
  );
}
