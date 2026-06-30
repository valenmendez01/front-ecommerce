import { useState } from "react";
import { Sparkles } from "lucide-react";

const obtenerAjusteImagen = (imagen, proporcionMarco) => {
  const proporcionImagen = imagen.naturalWidth / imagen.naturalHeight;
  const diferencia = Math.abs(proporcionImagen - proporcionMarco);

  return diferencia > 0.25 ? "object-contain" : "object-cover";
};

export default function ImagenProducto({
  src,
  alt,
  className,
  iconClassName = "text-dorado-primary",
  ajuste = "auto",
  fondoClassName = "bg-white",
}) {
  const [ajusteCalculado, setAjusteCalculado] = useState(ajuste === "auto" ? "object-cover" : ajuste);

  return (
    <div className={`${fondoClassName} flex items-center justify-center overflow-hidden ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full ${ajuste === "auto" ? ajusteCalculado : ajuste}`}
          onLoad={(event) => {
            if (ajuste !== "auto") return;

            const marco = event.currentTarget.parentElement;
            setAjusteCalculado(obtenerAjusteImagen(event.currentTarget, marco.clientWidth / marco.clientHeight));
          }}
        />
      ) : (
        <Sparkles size={24} className={iconClassName} />
      )}
    </div>
  );
}
