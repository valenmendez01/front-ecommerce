import { useState } from "react";
import { Image } from "@heroui/react";

export const GaleriaProducto = ({ imagenes, nombre }) => {
  const [imagenActiva, setImagenActiva] = useState(0);

  return (
    <div className="flex flex-col gap-4">

      {/* Imagen principal */}
      <Image
        src={imagenes[imagenActiva]}
        alt={nombre}
        className="w-full object-cover rounded-xl"
        width="100%"
        height={420}
      />

      {/* Miniaturas */}
      <div className="flex gap-3">
        {imagenes.map((img, index) => (
          <button
            key={index}
            onClick={() => setImagenActiva(index)}
            className={`rounded-lg overflow-hidden border-2 transition-all ${
              imagenActiva === index
                ? "border-blue-500"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${nombre} ${index + 1}`}
              width={72}
              height={72}
              className="object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  );
};