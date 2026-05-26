import { Spinner } from "@heroui/react";

const PantallaCargandoSesion = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-950">
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-black uppercase tracking-widest text-green-700">FIGULLECT</p>
      <Spinner size="lg" classNames={{ circle1: "border-b-dorado-primary", circle2: "border-b-dorado-primary" }} />
      <p className="text-sm font-medium text-slate-500">Cargando...</p>
    </div>
  </div>
);

export default PantallaCargandoSesion;