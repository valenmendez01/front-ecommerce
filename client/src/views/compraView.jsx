import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccordionEnvio from "../components/compra/envio";
import AccordionPago from "../components/compra/pago";
import AlertasCompra from "../components/compra/alertasCompra";
import FooterCompra from "../components/compra/footerCompra";
import HeaderCompra from "../components/compra/headerCompra";
import PanelPedido from "../components/compra/panelPedido";
import PasosCompra from "../components/compra/pasosCompra";
import PedidoConfirmado from "../components/compra/pedidoConfirmado";
import ResumenPago from "../components/compra/resumenPago";
import TituloCompra from "../components/compra/tituloCompra";
import copaMundo from "../assets/copa-mundo.png";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../lib/api";
import { obtenerArticulosCarrito, vaciarCarrito } from "../lib/carritoStorage";

export default function CompraView() {
  const [envioGuardado, setEnvioGuardado] = useState(false);
  const [pagoGuardado, setPagoGuardado] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [cargandoConfirmar, setCargandoConfirmar] = useState(false);
  const [errorConfirmar, setErrorConfirmar] = useState(null);
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const articulos = obtenerArticulosCarrito();
  const esComprador = usuario?.rol === "COMPRADOR";
  const puedeConfirmar = envioGuardado && pagoGuardado && articulos.length > 0 && esComprador;

  const confirmarPedido = () => {
    if (!usuario) {
      setErrorConfirmar("Tenes que iniciar sesion para confirmar el pedido.");
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
        items: articulos.map((articulo) => ({
          idProducto: articulo.id,
          cantidad: articulo.cantidad,
        })),
      },
    })
      .then(() => {
        vaciarCarrito();
        setConfirmado(true);
      })
      .catch((error) => setErrorConfirmar(`No se pudo confirmar el pedido: ${error.message}`))
      .finally(() => setCargandoConfirmar(false));
  };

  if (confirmado) {
    return <PedidoConfirmado alVolverInicio={() => navigate("/")} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <img src={copaMundo} alt="" className="absolute -right-48 top-16 w-[900px] opacity-5 pointer-events-none select-none z-0" />
      <HeaderCompra alVolverCarrito={() => navigate("/carrito")} />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <PasosCompra />
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
                puedeConfirmar={puedeConfirmar}
                cargando={cargandoConfirmar}
                alConfirmar={confirmarPedido}
              />
            </div>
          </div>
        </div>
      </main>

      <FooterCompra />
    </div>
  );
}
