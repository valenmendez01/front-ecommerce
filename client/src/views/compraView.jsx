// CompraView.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PackageCheck } from "lucide-react";

import PanelPedido from "../components/compra/panelPedido";
import AccordionEnvio from "../components/compra/envio";
import AccordionPago from "../components/compra/pago";
import ResumenPago from "../components/compra/resumenPago";

import copaMundo from "../assets/copa-mundo.png";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../lib/api";
import { obtenerArticulosCarrito, vaciarCarrito } from "../lib/carritoStorage";
import { Button } from "@heroui/react";

const PASOS = [
  "Carrito",
  "Información",
  "Confirmación",
];

export default function CompraView() {
  const [envioGuardado, setEnvioGuardado] =
    useState(false);

  const [pagoGuardado, setPagoGuardado] =
    useState(false);

  const [confirmado, setConfirmado] =
    useState(false);

  const [cargandoConfirmar, setCargandoConfirmar] =
    useState(false);

  const [errorConfirmar, setErrorConfirmar] =
    useState(null);

  const navigate = useNavigate();
  const { usuario } = useAuth();

  const articulosIniciales = obtenerArticulosCarrito();
  const esComprador = usuario?.rol === "COMPRADOR";

  const puedeConfirmar =
    envioGuardado && pagoGuardado && articulosIniciales.length > 0 && esComprador;

  const confirmarPedido = () => {
    if (!usuario) {
      setErrorConfirmar("Tenés que iniciar sesión para confirmar el pedido.");
      return;
    }

    if (!esComprador) {
      setErrorConfirmar("Solo una cuenta compradora puede confirmar pedidos.");
      return;
    }

    setCargandoConfirmar(true);

    setErrorConfirmar(null);

    apiRequest("/pedidos", {
      method: "POST",
      body: {
        idUsuario: usuario.idUsuario,
        items: articulosIniciales.map((a) => ({
          idProducto: a.id,
          cantidad: a.cantidad,
        })),
      },
    })
      .then((json) => {
        if (json) {
          vaciarCarrito();

          setConfirmado(true);
        }
      })
      .catch((error) => {
        console.error(
          "Error al confirmar pedido:",
          error
        );

        setErrorConfirmar(`No se pudo confirmar el pedido: ${error.message}`);
      })
      .finally(() =>
        setCargandoConfirmar(false)
      );
  };

  if (confirmado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <PackageCheck
              size={36}
              className="text-green-600"
            />
          </div>

          <h1 className="text-2xl font-black text-gray-900 mb-2">
            ¡Pedido Confirmado!
          </h1>

          <p className="text-gray-500 mb-6">
            Recibirás un email con los detalles
            de tu colección. ¡Gracias por tu
            compra!
          </p>

          <Button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <img
        src={copaMundo}
        alt=""
        className="absolute -right-48 top-16 w-[900px] opacity-5 pointer-events-none select-none z-0"
      />

      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-black text-blue-700 text-xl italic tracking-tight">
            FIGULLECT
          </span>

          <Button
            variant="light"
            startContent={<ArrowLeft size={16} />}
            onPress={() => navigate("/carrito")}
            className="text-sm text-gray-500"
          >
            Volver al carrito
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 mb-8">
          {PASOS.map((paso, i) => (
            <div
              key={paso}
              className="flex items-center gap-2"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                  i === 2
                    ? "bg-green-500 text-white"
                    : "bg-gray-900 text-white"
                }`}
              >
                {i + 1}
              </div>

              <span
                className={`text-xs font-semibold ${
                  i === 2
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {paso}
              </span>

              {i < PASOS.length - 1 && (
                <div className="w-8 h-px bg-gray-200" />
              )}
            </div>
          ))}

          <p className="ml-2 text-xs text-gray-400">
            Paso 3 de 3: Confirmación segura
          </p>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
            Revisar Pedido
          </h1>

          <div className="h-1 w-16 bg-green-400 rounded-full mt-2" />
        </div>

        {errorConfirmar && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-semibold">
            {errorConfirmar}
          </div>
        )}

        {usuario && !esComprador && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700 font-semibold">
            Estás logueado como vendedor. Para confirmar un pedido necesitás iniciar sesión con una cuenta compradora.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <PanelPedido
              articulos={articulosIniciales}
            />

            <AccordionEnvio
              alGuardar={() =>
                setEnvioGuardado(true)
              }
            />

            <AccordionPago
              alGuardar={() =>
                setPagoGuardado(true)
              }
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ResumenPago
                articulos={articulosIniciales}
                puedeConfirmar={puedeConfirmar}
                cargando={cargandoConfirmar}
                alConfirmar={confirmarPedido}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 text-xs py-8 mt-16 relative z-10">
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
