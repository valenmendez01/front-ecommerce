import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";

import AccordionEnvio from "../components/compra/envio/Envio";
import AccordionPago from "../components/compra/pago/Pago";
import AlertasCompra from "../components/compra/AlertasCompra";
import HeaderCompra from "../components/compra/HeaderCompra";
import PanelPedido from "../components/compra/PanelPedido";
import PedidoConfirmado from "../components/compra/PedidoConfirmado";
import ResumenPago from "../components/compra/pago/ResumenPago";
import TituloCompra from "../components/compra/TituloCompra";
import copaMundo from "../assets/copa-mundo.png";
import { useAuth } from "../context/useAuth";
import { calcularResumenCarrito, obtenerArticulosCarrito, vaciarCarrito } from "../lib/reglasCarrito";

const leerRespuesta = async (respuesta) => {
  const texto = await respuesta.text();
  if (!texto) return null;

  try {
    return JSON.parse(texto);
  } catch {
    return { mensaje: texto };
  }
};

const obtenerMensajeErrorPedido = (respuesta, json) => {
  const mensaje = json?.mensaje || json?.message || respuesta.statusText;
  const mensajeMinuscula = mensaje?.toLowerCase() || "";

  if ([502, 503, 504].includes(respuesta.status) || mensajeMinuscula.includes("bad gateway")) {
    return "El servidor tardó demasiado en confirmar el pedido. Revisá tus pedidos antes de volver a intentarlo.";
  }

  return mensaje || "No se pudo confirmar el pedido.";
};

export default function Compra() {
  const [envioGuardado, setEnvioGuardado] = useState(false);
  const [costoEnvio, setCostoEnvio] = useState(null);
  const [pagoGuardado, setPagoGuardado] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [cargandoConfirmar, setCargandoConfirmar] = useState(false);
  const [errorConfirmar, setErrorConfirmar] = useState(null);
  const navigate = useNavigate();
  const { usuario, token } = useAuth();

  const articulos = obtenerArticulosCarrito(usuario?.idUsuario);
  const resumen = calcularResumenCarrito(articulos, envioGuardado ? costoEnvio : null);
  const esComprador = usuario?.rol === "COMPRADOR";
  const puedeConfirmar = envioGuardado && pagoGuardado && articulos.length > 0 && esComprador;

  const confirmarPedido = async () => {
    const respuesta = await fetch("/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idUsuario: usuario.idUsuario,
        items: articulos.map((articulo) => ({
          idProducto: articulo.id,
          cantidad: articulo.cantidad,
        })),
      }),
    });

    const json = await leerRespuesta(respuesta);
    if (!respuesta.ok) throw new Error(obtenerMensajeErrorPedido(respuesta, json));
    return json?.mensaje || "Pedido confirmado";
  };

  const confirmarCompra = () => {
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

    confirmarPedido()
      .then((mensajeBack) => {
        vaciarCarrito(usuario.idUsuario);
        setConfirmado(true);
        addToast({ color: "success", title: mensajeBack });
      })
      .catch((error) => {
        const mensaje = `No se pudo confirmar el pedido: ${error.message}`;
        setErrorConfirmar(mensaje);
        addToast({ color: "danger", title: error.message });
      })
      .finally(() => setCargandoConfirmar(false));
  };

  const guardarEnvio = (datosEnvio) => {
    setEnvioGuardado(true);
    setCostoEnvio(datosEnvio.costoEnvio);
  };

  if (confirmado) return <PedidoConfirmado alVolverInicio={() => navigate("/")} />;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans text-slate-950">
      <img src={copaMundo} alt="" className="absolute -right-48 top-16 w-[900px] opacity-5 pointer-events-none select-none z-0" />
      <HeaderCompra alVolverCarrito={() => navigate("/carrito")} />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <TituloCompra />
        <AlertasCompra error={errorConfirmar} esVendedor={usuario && !esComprador} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <PanelPedido articulos={articulos} />
            <AccordionEnvio alGuardar={guardarEnvio} />
            <AccordionPago alGuardar={() => setPagoGuardado(true)} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ResumenPago articulos={articulos} resumen={resumen} puedeConfirmar={puedeConfirmar} cargando={cargandoConfirmar} alConfirmar={confirmarCompra} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
