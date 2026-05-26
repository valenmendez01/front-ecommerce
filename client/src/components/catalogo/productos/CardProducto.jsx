import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { motion } from "framer-motion";
import sinImagen from "../../../assets/sinImagen.png";
import { useNavigate } from "react-router-dom";

export const CardProducto = ({ producto }) => {
  const navigate = useNavigate();

  const imagenSrc =
    producto.imagenes?.length > 0
      ? `data:image/jpeg;base64,${producto.imagenes[0].contenidoBase64}`
      : sinImagen;

  const tieneDescuento = producto.descuento > 0;
  const precioFinal = tieneDescuento
    ? producto.precio * (1 - producto.descuento / 100)
    : producto.precio;

  const formatear = (valor) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" , maximumFractionDigits: 0 }).format(valor);

  return (
    <motion.div
      whileHover={{
        boxShadow: "0 4px 20px color-mix(in srgb, #caa56e 80%, transparent)",
        scale: 1.02,
      }}
      transition={{ duration: 0.2 }}
      style={{ borderRadius: "12px" }}
    >
      <Card
        className="w-60 overflow-hidden"
        isPressable
        shadow="sm"
        onPress={() => navigate(`/productos/${producto.idProducto}`)}
      >
        <CardBody className="p-0">
          <div className="aspect-[579/768] w-full overflow-hidden">
            <Image
              alt={producto.nombre}
              src={imagenSrc}
              className="h-full w-full object-cover"
              radius="lg"
              shadow="sm"
            />
          </div>
        </CardBody>

        <CardFooter className="flex w-full flex-col items-start gap-2">
          <b className="line-clamp-2 min-h-12 w-full break-words text-center text-base leading-6 text-[var(--color-green-primary)]">{producto.nombre}</b>

          <div className="flex w-full min-w-0 flex-wrap items-center gap-2">
            <span className={tieneDescuento ? "text-default-400 line-through text-xs" : "text-default-500"}>
              {formatear(producto.precio)}
            </span>
            {tieneDescuento && (
              <>
                <span className="text-default-700 font-semibold">{formatear(precioFinal)}</span>
                <span className="text-xs font-medium text-white bg-dorado-primary px-1.5 py-0.5 rounded-full">
                  -{producto.descuento}%
                </span>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
