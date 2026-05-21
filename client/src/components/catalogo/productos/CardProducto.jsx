import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import sinImagen from "../../../assets/sinImagen.png";
import { useNavigate } from "react-router-dom";

export const CardProducto = ({ producto }) => {
  const navigate = useNavigate();

  const imagenSrc =
    producto.imagenes?.length > 0
      ? `data:image/jpeg;base64,${producto.imagenes[0].contenidoBase64}`
      : sinImagen;

  return (
    <Card
      isPressable
      shadow="sm"
      onPress={() => navigate(`/productos/${producto.idProducto}`)}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          alt={producto.nombre}
          src={imagenSrc}
          className="object-cover"
          radius="lg"
          shadow="sm"
          width={240}
          height={320}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{producto.nombre}</b>
        <p className="text-default-500">
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(producto.precio)}
        </p>
      </CardFooter>
    </Card>
  );
};