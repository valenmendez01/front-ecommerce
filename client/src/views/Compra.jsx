import { Button } from "@heroui/react"
import { ArrowLeft } from "lucide-react"

import AccordionEnvio from "../components/compra/envio/Envio"
import AccordionPago from "../components/compra/pago/Pago"
import AlertasCompra from "../components/compra/AlertasCompra"
import PanelPedido from "../components/compra/PanelPedido"
import PedidoConfirmado from "../components/compra/PedidoConfirmado"
import ResumenPago from "../components/compra/pago/ResumenPago"
import TituloCompra from "../components/compra/TituloCompra"
import copaMundo from "../assets/copa-mundo.png"
import { useCompra } from "../lib/useCompra"

export default function Compra() {
  const compra = useCompra()

  if (compra.confirmado) {
    return <PedidoConfirmado alVolverInicio={compra.irAlInicio} />
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans text-slate-950">
      <img
        src={copaMundo}
        alt=""
        className="absolute -right-48 top-16 w-[900px] opacity-5 pointer-events-none select-none z-0"
      />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <Button
          className="mb-6 text-green-primary"
          startContent={<ArrowLeft size={17} />}
          variant="light"
          onPress={compra.irAlCarrito}
        >
          Volver al carrito
        </Button>

        <TituloCompra />

        <AlertasCompra
          error={compra.errorConfirmar}
          esVendedor={compra.esVendedor}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <PanelPedido articulos={compra.articulos} />

            <AccordionEnvio
              alGuardar={compra.guardarEnvio}
            />

            <AccordionPago
              alGuardar={compra.guardarPago}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ResumenPago
                articulos={compra.articulos}
                resumen={compra.resumen}
                puedeConfirmar={compra.puedeConfirmar}
                cargando={compra.cargandoConfirmar}
                alConfirmar={compra.confirmar}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
