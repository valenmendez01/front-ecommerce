import { useState } from "react";
import { Image } from "@heroui/react";
import sinImagen from "../../assets/sinImagen.png";
import { CometCard } from "../../components/ui/comet-card";
import { AnimatePresence, motion } from "framer-motion";

export const GaleriaProducto = ({ imagenes, nombre }) => {
  const [imagenActiva, setImagenActiva] = useState(0);

  const sinImagenes = !imagenes || imagenes.length === 0;

  return (
    <div className="flex flex-col gap-6">

      {/* Imagen principal */}
      <CometCard>
        <AnimatePresence mode="wait">
          <motion.div
            key={imagenActiva}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.20 }}
          >
            <Image
              src={
                sinImagenes
                  ? sinImagen
                  : `data:image/jpeg;base64,${imagenes[imagenActiva]?.contenidoBase64}`
              }
              alt={nombre}
              className="w-full object-contain"
              width={220}
              height={280}
              radius="lg"
              shadow="sm"
            />
          </motion.div>
        </AnimatePresence>
      </CometCard>

      {/* Miniaturas */}
      <div className="flex gap-3">
        {imagenes.map((img, index) => (
          <button
            key={index}
            onClick={() => setImagenActiva(index)}
            className={`rounded-xl overflow-hidden border-2 transition-all ${
              imagenActiva === index
                ? "border-dorado-primary"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={`data:image/jpeg;base64,${img.contenidoBase64}`}
              alt={`${nombre} ${index + 1}`}
              radius="lg"
              width={50}
              height={65}
              className="object-contain"
            />
          </button>
        ))}
      </div>

    </div>
  );
};
