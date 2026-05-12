import { Card, CardBody, CardFooter, Image } from "@heroui/react";

export const CardProductos = ({productos}) => {
  if (productos.length === 0) {
    return <p>No hay productos para los filtros seleccionados.</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {productos.map((producto) => (
        <Card key={producto.id} isPressable shadow="sm" onPress={() => console.log(producto.nombre)}>
          <CardBody className="overflow-visible p-0">
            <Image
              alt={producto.nombre}
              className="object-cover"
              radius="lg"
              shadow="sm"
              src={producto.img}
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
