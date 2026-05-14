import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import sinImagen from "../../assets/sinImagen.png";
import { useNavigate } from "react-router-dom";

export const CardProductos = ({productos}) => {
  const navigate = useNavigate();

  if (productos.length === 0) {
    return <p>No hay productos para los filtros seleccionados.</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {productos.map((producto) => (
        <Card key={producto.idProducto} isPressable shadow="sm" onPress={() => navigate(`/productos/${producto.idProducto}`)}>
          <CardBody className="overflow-visible p-0">
            <Image
              alt={producto.nombre}
              src={
                producto.imagenes?.length > 0
                  ? `data:image/jpeg;base64,${producto.imagenes[0].contenidoBase64}`
                  : sinImagen
              }
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
              {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(producto.precio)}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
