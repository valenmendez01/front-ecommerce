// CarritoView.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

import Navigation from "../components/Navigation";
import ArticuloCarrito from "../components/carrito/itemCarrito";
import ResumenCarrito from "../components/carrito/resumenCarrito";
import ProductosRecomendados from "../components/carrito/itemsRecomendados";

import copaMundo from "../assets/copa-mundo.png";
import { formatearPesos } from "../lib/formatters";

const PROGRESO_COLECCION = 85;

export default function CarritoView() {
  const [articulos, setArticulos] = useState([]);
  const [carritoCargado, setCarritoCargado] = useState(false);
  const navigate = useNavigate();

  // Cargar carrito desde localStorage
  useEffect(() => {
    const carritoGuardado = JSON.parse(
      localStorage.getItem("carrito") || "[]"
    );

    setArticulos(carritoGuardado);
    setCarritoCargado(true);
  }, []);

  // Guardar carrito automáticamente
  useEffect(() => {
    if (!carritoCargado) return;

    localStorage.setItem("carrito", JSON.stringify(articulos));
  }, [articulos, carritoCargado]);

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarArticulo(id);
      return;
    }

    setArticulos((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, cantidad: nuevaCantidad }
          : a
      )
    );
  };

  const eliminarArticulo = (id) => {
    setArticulos((prev) =>
      prev.filter((a) => a.id !== id)
    );
  };

  const agregarArticulo = (articulo) => {
    setArticulos((prev) => {
      const existe = prev.find((a) => a.id === articulo.id);

      if (existe) {
        return prev.map((a) =>
          a.id === articulo.id
            ? {
                ...a,
                cantidad: a.cantidad + 1,
              }
            : a
        );
      }

      return [
        ...prev,
        {
          ...articulo,
          cantidad: 1,
          subtitulo: "RECOMENDADO",
        },
      ];
    });
  };

  const irAlPago = () => {
    navigate("/compra");
  };

  const subtotal = articulos.reduce(
    (acc, a) => acc + a.precio * a.cantidad,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <img
        src={copaMundo}
        alt=""
        className="absolute -right-48 top-16 w-[900px] opacity-5 pointer-events-none select-none"
      />

      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-black text-blue-700 text-xl italic tracking-tight">
            FIGULLECT
          </span>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {[
              "Stickers",
              "Albums",
              "Rare Items",
              "Packs",
              "Marketplace",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <ShoppingBag size={28} className="text-blue-600" />
            Tu Bolsa de Colección
          </h1>

          <div className="h-1 w-16 bg-green-400 rounded-full mt-2" />
        </div>

        {articulos.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <ShoppingBag
              size={48}
              className="mx-auto mb-4 opacity-30"
            />

            <p className="text-lg font-semibold">
              Tu bolsa está vacía
            </p>

            <p className="text-sm mt-1">
              Agregá productos para continuar
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Progreso colección: Edición Gold
                  </p>

                  <span className="text-sm font-black text-green-500">
                    {PROGRESO_COLECCION}% COMPLETO
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 rounded-full transition-all"
                    style={{
                      width: `${PROGRESO_COLECCION}%`,
                    }}
                  />
                </div>
              </div>

              {articulos.map((articulo) => (
                <ArticuloCarrito
                  key={articulo.id}
                  articulo={articulo}
                  alActualizarCantidad={actualizarCantidad}
                  alEliminar={eliminarArticulo}
                />
              ))}

              <ProductosRecomendados
                alAgregar={agregarArticulo}
              />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ResumenCarrito
                  subtotal={subtotal}
                  alProcederAlPago={irAlPago}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {articulos.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg">
          <button
            onClick={irAlPago}
            className="w-full py-3 bg-yellow-400 text-gray-900 font-black rounded-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            Ir al Pago - {formatearPesos(subtotal)}

            <ArrowRight size={16} />
          </button>
        </div>
      )}

      <footer className="bg-gray-900 text-gray-400 text-xs py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-black text-white italic">
            FIGULLECT
          </span>

          <div className="flex gap-6">
            {[
              "Política de Privacidad",
              "Términos",
              "Envíos",
              "Contacto",
            ].map((l) => (
              <a
                key={l}
                href="#"
                className="hover:text-white transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          <span>
            © 2026 FIFA WORLD CUP COLLECTIBLES
          </span>
        </div>
      </footer>
    </div>
  );
}
