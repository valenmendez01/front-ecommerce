import BotonVolver from "../components/auth/botones/BotonVolver"
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
    <div className="relative min-h-[calc(100vh-10rem)] overflow-hidden bg-white font-body text-slate-950">
      <img
        src={copaMundo}
        alt=""
        className="pointer-events-none absolute -right-48 top-8 w-[820px] select-none opacity-5"
      />

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-9">
        <BotonVolver className="mb-5" onPress={carrito.volverPaginaAnterior} />

        <TituloCarrito />

        {carrito.articulos.length === 0 ? (
          <CarritoVacio />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8">
            <div className="flex min-w-0 flex-col gap-3">
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

            <div className="h-fit lg:sticky lg:top-28">
              <ResumenCarrito
                resumen={carrito.resumen}
                alProcederAlPago={carrito.irAlPago}
              />
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
