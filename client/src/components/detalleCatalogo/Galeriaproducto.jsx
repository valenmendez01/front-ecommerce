import { useState } from "react";
import { Image } from "@heroui/react";
import sinImagen from "../../assets/sinImagen.png";

export const GaleriaProducto = ({ imagenes, nombre }) => {
  const [imagenActiva, setImagenActiva] = useState(0);

  const sinImagenes = !imagenes || imagenes.length === 0;

  return (
    <div className="flex flex-col gap-4">

      {/* Imagen principal */}
      <Image
        src={
          sinImagenes
            ? sinImagen
            : `data:image/jpeg;base64,${imagenes[imagenActiva]?.contenidoBase64}`
        }
        alt={nombre}
        className="w-full object-cover"
        width={340}
        height={450}
        radius="lg"
        shadow="sm"
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
              src={`data:image/jpeg;base64,${img.contenidoBase64}`}
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