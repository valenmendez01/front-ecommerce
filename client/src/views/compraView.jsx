import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";

import AccordionEnvio from "../components/compra/envio/envio";
import AccordionPago from "../components/compra/pago/pago";
import AlertasCompra from "../components/compra/alertasCompra";
import HeaderCompra from "../components/compra/headerCompra";
import PanelPedido from "../components/compra/panelPedido";
import PedidoConfirmado from "../components/compra/pedidoConfirmado";
import ResumenPago from "../components/compra/pago/resumenPago";
import TituloCompra from "../components/compra/tituloCompra";
import { confirmarPedido } from "../components/compra/confirmarPedido";
import copaMundo from "../assets/copa-mundo.png";
import { useAuth } from "../context/useAuth";
import { calcularResumenCarrito, obtenerArticulosCarrito, vaciarCarrito } from "../data/reglasCarrito";

export default function CompraView() {
  const [envioGuardado, setEnvioGuardado] = useState(false);
  const [pagoGuardado, setPagoGuardado] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [cargandoConfirmar, setCargandoConfirmar] = useState(false);
  const [errorConfirmar, setErrorConfirmar] = useState(null);
  const navigate = useNavigate();
  const { usuario, token } = useAuth();

  const articulos = obtenerArticulosCarrito(usuario?.idUsuario);
  const resumen = calcularResumenCarrito(articulos);
  const esComprador = usuario?.rol === "COMPRADOR";
  const puedeConfirmar = envioGuardado && pagoGuardado && articulos.length > 0 && esComprador;

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

    confirmarPedido({ articulos, token, usuario })
      .then((mensajeBack) => {
        vaciarCarrito(usuario.idUsuario);
        setConfirmado(true);
        addToast({
          color: "success",
          title: mensajeBack,
          description: "Tu compra se registró correctamente.",
        });
      })
      .catch((error) => {
        const mensaje = `No se pudo confirmar el pedido: ${error.message}`;
        setErrorConfirmar(mensaje);
        addToast({ color: "danger", title: "No se pudo confirmar el pedido", description: error.message });
      })
      .finally(() => setCargandoConfirmar(false));
  };

  if (confirmado) {
    return <PedidoConfirmado alVolverInicio={() => navigate("/")} />;
  }

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
            <AccordionEnvio alGuardar={() => setEnvioGuardado(true)} />
            <AccordionPago alGuardar={() => setPagoGuardado(true)} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ResumenPago
                articulos={articulos}
                resumen={resumen}
                puedeConfirmar={puedeConfirmar}
                cargando={cargandoConfirmar}
                alConfirmar={confirmarCompra}
              />
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
