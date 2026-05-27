import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArticuloCarrito from "../components/carrito/items/ItemCarrito";
import BarraPagoMovil from "../components/carrito/BarraPagoMovil";
import CarritoVacio from "../components/carrito/CarritoVacio";
import HeaderCarrito from "../components/carrito/HeaderCarrito";
import ProductosRecomendados from "../components/carrito/items/ItemsRecomendados";
import ResumenCarrito from "../components/carrito/ResumenCarrito";
import TituloCarrito from "../components/carrito/TituloCarrito";
import copaMundo from "../assets/copa-mundo.png";
import { useAuth } from "../context/useAuth";
import {
  calcularResumenCarrito,
  obtenerArticulosCarrito,
  reemplazarArticulosCarrito,
} from "../data/reglasCarrito";

export default function Carrito() {
  const { usuario } = useAuth();
  const idUsuario = usuario?.idUsuario;
  const [articulos, setArticulos] = useState(() => obtenerArticulosCarrito(idUsuario));
  const navigate = useNavigate();

  useEffect(() => {
    reemplazarArticulosCarrito(articulos, idUsuario);
  }, [articulos, idUsuario]);

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarArticulo(id);
      return;
    }

    setArticulos((prev) =>
      prev.map((articulo) => {
        if (articulo.id !== id) return articulo;

        const stock = Number(articulo.stock ?? nuevaCantidad);
        const cantidad = Math.min(nuevaCantidad, stock);
        return { ...articulo, cantidad };
      }),
    );
  };

  const eliminarArticulo = (id) => {
    setArticulos((prev) => prev.filter((articulo) => articulo.id !== id));
  };

  const resumen = calcularResumenCarrito(articulos);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans text-slate-950">
      <img src={copaMundo} alt="" className="absolute -right-48 top-16 w-[900px] opacity-5 pointer-events-none select-none" />
      <HeaderCarrito alVolverInicio={() => navigate("/")} />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <TituloCarrito />

        {articulos.length === 0 ? (
          <CarritoVacio />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {articulos.map((articulo) => (
                <ArticuloCarrito
                  key={articulo.id}
                  articulo={articulo}
                  alActualizarCantidad={actualizarCantidad}
                  alEliminar={eliminarArticulo}
                />
              ))}
              <ProductosRecomendados />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ResumenCarrito resumen={resumen} alProcederAlPago={() => navigate("/compra")} />
              </div>
            </div>
          </div>
        )}
      </main>

      {articulos.length > 0 && <BarraPagoMovil subtotal={resumen.total} alIrAlPago={() => navigate("/compra")} />}
    </div>
  );
}
