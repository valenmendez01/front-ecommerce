import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { calcularResumenCarrito } from "../lib/reglasCarrito";
import { cargarCarritoUsuario, vaciarCarritoRedux } from "../redux/carritoSlice";
import {
  confirmarPedidoCompra,
  guardarEnvioCompra,
  guardarPagoCompra,
  registrarErrorCompra,
  reiniciarCompra,
} from "../redux/compraSlice";

export default function Compra() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario, token } = useAuth();
  const articulos = useSelector((state) => state.carrito.articulos);
  const {
    cargandoConfirmar,
    confirmado,
    costoEnvio,
    envioGuardado,
    errorConfirmar,
    pagoGuardado,
  } = useSelector((state) => state.compra);

  useEffect(() => {
    dispatch(cargarCarritoUsuario(usuario?.idUsuario));
    return () => dispatch(reiniciarCompra());
  }, [dispatch, usuario?.idUsuario]);

  const resumen = calcularResumenCarrito(articulos, envioGuardado ? costoEnvio : null);
  const esComprador = usuario?.rol === "COMPRADOR";
  const puedeConfirmar = envioGuardado && pagoGuardado && articulos.length > 0 && esComprador;

  const confirmarCompra = () => {
    if (cargandoConfirmar) return;

    if (!usuario) {
      dispatch(registrarErrorCompra("Tenés que iniciar sesión para confirmar el pedido."));
      return;
    }

    if (!esComprador) {
      dispatch(registrarErrorCompra("Solo una cuenta compradora puede confirmar pedidos."));
      return;
    }

    dispatch(confirmarPedidoCompra({ articulos, token, usuario }))
      .unwrap()
      .then((mensajeBack) => {
        dispatch(vaciarCarritoRedux(usuario.idUsuario));
        addToast({ color: "success", title: mensajeBack });
      })
      .catch((error) => {
        addToast({ color: "danger", title: error });
      });
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
            <AccordionEnvio alGuardar={(datosEnvio) => dispatch(guardarEnvioCompra(datosEnvio))} />
            <AccordionPago alGuardar={() => dispatch(guardarPagoCompra())} />
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
