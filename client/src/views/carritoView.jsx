import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArticuloCarrito from "../components/carrito/itemCarrito";
import BarraPagoMovil from "../components/carrito/barraPagoMovil";
import CarritoVacio from "../components/carrito/carritoVacio";
import FooterCarrito from "../components/carrito/footerCarrito";
import HeaderCarrito from "../components/carrito/headerCarrito";
import ProductosRecomendados from "../components/carrito/itemsRecomendados";
import ProgresoColeccion from "../components/carrito/progresoColeccion";
import ResumenCarrito from "../components/carrito/resumenCarrito";
import TituloCarrito from "../components/carrito/tituloCarrito";
import copaMundo from "../assets/copa-mundo.png";
import {
  obtenerArticulosCarrito,
  reemplazarArticulosCarrito,
} from "../lib/carritoStorage";

export default function CarritoView() {
  const [articulos, setArticulos] = useState([]);
  const [carritoCargado, setCarritoCargado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setArticulos(obtenerArticulosCarrito());
    setCarritoCargado(true);
  }, []);

  useEffect(() => {
    if (carritoCargado) {
      reemplazarArticulosCarrito(articulos);
    }
  }, [articulos, carritoCargado]);

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarArticulo(id);
      return;
    }

    setArticulos((prev) =>
      prev.map((articulo) =>
        articulo.id === id ? { ...articulo, cantidad: nuevaCantidad } : articulo,
      ),
    );
  };

  const eliminarArticulo = (id) => {
    setArticulos((prev) => prev.filter((articulo) => articulo.id !== id));
  };

  const agregarArticulo = (articulo) => {
    setArticulos((prev) => {
      const existe = prev.find((actual) => actual.id === articulo.id);

      if (!existe) {
        return [...prev, { ...articulo, cantidad: 1, subtitulo: "RECOMENDADO" }];
      }

      return prev.map((actual) =>
        actual.id === articulo.id
          ? { ...actual, cantidad: actual.cantidad + 1 }
          : actual,
      );
    });
  };

  const subtotal = articulos.reduce(
    (total, articulo) => total + articulo.precio * articulo.cantidad,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <img src={copaMundo} alt="" className="absolute -right-48 top-16 w-[900px] opacity-5 pointer-events-none select-none" />
      <HeaderCarrito alVolverInicio={() => navigate("/")} />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <TituloCarrito />

        {articulos.length === 0 ? (
          <CarritoVacio />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <ProgresoColeccion />
              {articulos.map((articulo) => (
                <ArticuloCarrito
                  key={articulo.id}
                  articulo={articulo}
                  alActualizarCantidad={actualizarCantidad}
                  alEliminar={eliminarArticulo}
                />
              ))}
              <ProductosRecomendados alAgregar={agregarArticulo} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ResumenCarrito subtotal={subtotal} alProcederAlPago={() => navigate("/compra")} />
              </div>
            </div>
          </div>
        )}
      </main>

      {articulos.length > 0 && <BarraPagoMovil subtotal={subtotal} alIrAlPago={() => navigate("/compra")} />}
      <FooterCarrito />
    </div>
  );
}
