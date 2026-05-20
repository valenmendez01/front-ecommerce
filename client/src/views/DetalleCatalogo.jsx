import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Divider } from "@heroui/react";
import { GaleriaProducto } from "../components/detalleCatalogo/Galeriaproducto";
import { InfoProducto } from "../components/detalleCatalogo/Infoproducto";
import { AccionesProducto } from "../components/detalleCatalogo/Accionesproducto";


export const DetalleCatalogo = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`/productos/${id}`)
      .then((res) => res.json())
      .then((json) => setProducto(json.data))
      .catch((error) => console.error("Error al obtener producto:", error));
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen p-6 md:p-10">
      <Card className="max-w-5xl mx-auto p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">

          {/* Izquierda — galería */}
          <div className="flex items-center justify-center h-full">
            <GaleriaProducto
              imagenes={producto.imagenes}
              nombre={producto.nombre}
            />
          </div>

          {/* Derecha — info + acciones */}
          <div className="flex flex-col gap-6 px-8">
            <InfoProducto producto={producto} />
            <Divider />
            <AccionesProducto producto={producto} stock={producto.stock} />
          </div>

        </div>

      </Card>
    </div>
  );
};
