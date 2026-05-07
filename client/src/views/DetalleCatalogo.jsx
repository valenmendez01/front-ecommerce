
// Cuando conectes react-router, reemplazá MOCK_PRODUCTO por:
//   const { id } = useParams();
//   const producto = fetchProductoById(id);

import { Divider } from "@heroui/react";
import { GaleriaProducto } from "../components/detalleCatalogo/Galeriaproducto";
import { MOCK_PRODUCTO } from "../components/detalleCatalogo/Mockproducto";
import { InfoProducto } from "../components/detalleCatalogo/Infoproducto";
import { AccionesProducto } from "../components/detalleCatalogo/Accionesproducto";


export const DetalleCatalogo = () => {
  const producto = MOCK_PRODUCTO; // 👈 reemplazar por fetch real

  return (
    <div className="min-h-screen bg-[#f4f5f8] p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Izquierda — galería */}
          <GaleriaProducto
            imagenes={producto.imagenes}
            nombre={producto.nombre}
          />

          {/* Derecha — info + acciones */}
          <div className="flex flex-col gap-6">
            <InfoProducto producto={producto} />
            <Divider />
            <AccionesProducto stock={producto.stock} />
          </div>

        </div>

      </div>
    </div>
  );
};