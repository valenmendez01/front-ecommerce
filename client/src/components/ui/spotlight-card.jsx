const posicionesLuz = {
  centro: {
    foco: "left-1/2 top-0 -translate-x-1/2",
    gradiente: "bg-[radial-gradient(circle_at_50%_0%,rgba(202,165,110,0.22),transparent_45%)]",
  },
  derecha: {
    foco: "right-0 top-1/2 -translate-y-1/2",
    gradiente: "bg-[radial-gradient(circle_at_100%_50%,rgba(202,165,110,0.24),transparent_48%)]",
  },
};

export const SpotlightCard = ({ children, className = "", posicionLuz = "centro" }) => {
  const luz = posicionesLuz[posicionLuz] || posicionesLuz.centro;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-green-primary ${className}`}
    >
      <div className="pointer-events-none absolute -inset-20 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className={`absolute h-48 w-48 rounded-full bg-dorado-primary/20 blur-3xl ${luz.foco}`} />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className={`h-full w-full ${luz.gradiente}`} />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
