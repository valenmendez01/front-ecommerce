import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Divider } from "@heroui/react";
import { GaleriaProducto } from "../components/detalleCatalogo/Galeriaproducto";
import { InfoProducto } from "../components/detalleCatalogo/Infoproducto";
import { AccionesProducto } from "../components/detalleCatalogo/Accionesproducto";
import { SkeletonDetalle } from "../components/detalleCatalogo/SkeletonDetalle";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductoDetalle } from "../redux/catalogoSlice";

export const DetalleCatalogo = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const { productoDetalle: producto, loadingDetalle: cargando, error } = useSelector(state => state.productos)

  useEffect(() => {
    dispatch(fetchProductoDetalle(id))
  }, [dispatch, id])

  if (cargando || !producto) return <SkeletonDetalle />;

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
    <div className="mb-8">
      <Card className="max-w-4xl mx-auto p-6">

        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] items-stretch">

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
