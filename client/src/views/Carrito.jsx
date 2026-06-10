import { Button } from "@heroui/react"
import { ArrowLeft } from "lucide-react"

import ArticuloCarrito from "../components/carrito/items/ItemCarrito"
import BarraPagoMovil from "../components/carrito/BarraPagoMovil"
import CarritoVacio from "../components/carrito/CarritoVacio"
import ProductosRecomendados from "../components/carrito/items/ItemsRecomendados"
import ResumenCarrito from "../components/carrito/ResumenCarrito"
import TituloCarrito from "../components/carrito/TituloCarrito"
import copaMundo from "../assets/copa-mundo.png"
import { useCarrito } from "../lib/useCarrito"

export default function Carrito() {
  const carrito = useCarrito()

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans text-slate-950">
      <img
        src={copaMundo}
        alt=""
        className="absolute -right-48 top-16 w-[900px] opacity-5 pointer-events-none select-none"
      />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <Button
          className="mb-6 text-green-primary"
          startContent={<ArrowLeft size={17} />}
          variant="light"
          onPress={carrito.volverPaginaAnterior}
        >
          Volver
        </Button>

        <TituloCarrito />

        {carrito.articulos.length === 0 ? (
          <CarritoVacio />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {carrito.articulos.map((articulo) => (
                <ArticuloCarrito
                  key={articulo.id}
                  articulo={articulo}
                  alActualizarCantidad={carrito.actualizarCantidad}
                  alEliminar={carrito.eliminarArticulo}
                />
              ))}

              <ProductosRecomendados articulosCarrito={carrito.articulos} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ResumenCarrito
                  resumen={carrito.resumen}
                  alProcederAlPago={carrito.irAlPago}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {carrito.articulos.length > 0 && (
        <BarraPagoMovil
          subtotal={carrito.resumen.total}
          alIrAlPago={carrito.irAlPago}
        />
      )}
    </div>
  )
}
