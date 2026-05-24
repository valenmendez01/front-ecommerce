import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Divider } from "@heroui/react";
import { GaleriaProducto } from "../components/detalleCatalogo/Galeriaproducto";
import { InfoProducto } from "../components/detalleCatalogo/Infoproducto";
import { AccionesProducto } from "../components/detalleCatalogo/Accionesproducto";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";


export const DetalleCatalogo = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCargando(true);
    setError("");

    fetch(`/productos/${id}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.data) {
          throw new Error(json.mensaje || json.message || "Producto no encontrado.");
        }
        setProducto(json.data);
      })
      .catch(() => {
        setProducto(null);
        setError("Producto no encontrado.");
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <p className="p-6">Cargando...</p>;

  if (error) {
    return (
      <div className="min-h-screen p-6 md:p-10">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <h1 className="text-2xl font-black text-emerald-950">{error}</h1>
          <p className="mt-3 text-gray-600">
            El producto que queres ver no existe o ya no esta disponible.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10">
      <Card className="max-w-5xl mx-auto p-8">

        <div className="flex justify-end mb-4">
          <Button
            onPress={() => navigate(-1)}
            variant="outline"
            startContent={<ChevronLeft size={20} />}
            className="text-dorado-primary"
          >
            Volver
          </Button>
        </div>

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
            <AccionesProducto producto={producto} />
          </div>

        </div>

      </Card>
    </div>
  );
};
