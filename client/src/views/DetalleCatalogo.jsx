import { Card, Divider } from "@heroui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AccionesProducto } from "../components/detalleCatalogo/Accionesproducto";
import { GaleriaProducto } from "../components/detalleCatalogo/Galeriaproducto";
import { InfoProducto } from "../components/detalleCatalogo/Infoproducto";
import { SkeletonDetalle } from "../components/detalleCatalogo/SkeletonDetalle";
import { fetchProductoDetalle } from "../redux/catalogoSlice";

export const DetalleCatalogo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    detallesPorId,
    errorDetalle,
    errorDetalleId,
    loadingDetalle: cargando,
  } = useSelector((state) => state.productos);
  const idActual = String(id);
  const producto = detallesPorId[idActual];
  const errorActual = errorDetalleId === idActual ? errorDetalle : null;

  useEffect(() => {
    if (detallesPorId[idActual]) return;
    dispatch(fetchProductoDetalle(id));
  }, [detallesPorId, dispatch, id, idActual]);

  if (errorActual) {
    return (
      <div className="min-h-screen p-6 md:p-10">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <h1 className="text-2xl font-black text-emerald-950">{errorActual}</h1>
          <p className="mt-3 text-gray-600">
            El producto que querés ver no existe o ya no está disponible.
          </p>
        </Card>
      </div>
    );
  }

  if ((cargando && !producto) || !producto) return <SkeletonDetalle />;

  return (
    <div className="mb-8">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] items-stretch">
          <div className="flex items-center justify-center h-full">
            <GaleriaProducto
              imagenes={producto.imagenes}
              nombre={producto.nombre}
            />
          </div>

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
