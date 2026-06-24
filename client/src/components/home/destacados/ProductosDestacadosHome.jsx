import { motion } from "framer-motion"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cn } from "../../../lib/utils"
import { fetchProductosDestacadosHome } from "../../../redux/homeSlice"
import TarjetaProductoDestacadoHome from "./TarjetaProductoDestacadoHome"
import TarjetaProductoDestacadoSkeleton from "./TarjetaProductoDestacadoSkeleton"

const ProductosDestacadosHome = ({ compacto = false }) => {
  const dispatch = useDispatch()
  const { productosDestacados, loadingDestacados, destacadosCargados } = useSelector((state) => state.home)

  useEffect(() => {
    if (!destacadosCargados && !loadingDestacados) {
      dispatch(fetchProductosDestacadosHome())
    }
  }, [destacadosCargados, dispatch, loadingDestacados])

  if (!loadingDestacados && productosDestacados.length === 0) return null

  return (
    <section className={cn(
      "px-6 text-green-primary",
      compacto ? "bg-transparent pb-14 pt-7" : "bg-white pb-12 pt-7",
    )}>
      <div className={cn("mx-auto", compacto ? "max-w-[82rem]" : "max-w-7xl")}>
        <div className={cn(
          "flex flex-col items-center text-center",
          compacto && "productos-gsap-encabezado",
          compacto ? "gap-0.5" : "gap-2",
        )}>
          <motion.p
            className={cn(
              "font-black uppercase text-dorado-primary",
              compacto ? "text-xs tracking-[0.28em]" : "text-sm tracking-[0.35em]",
            )}
            initial={{ filter: "blur(8px)", opacity: 0, y: compacto ? 24 : 34 }}
            transition={{ duration: compacto ? 0.58 : 0.7, ease: "easeOut" }}
            viewport={{ amount: 0.8, once: false }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          >
            Favoritos de colección
          </motion.p>
          <motion.h2
            className={cn(
              "font-black uppercase leading-none",
              compacto ? "text-2xl md:text-4xl" : "text-4xl md:text-6xl",
            )}
            initial={{ filter: "blur(10px)", opacity: 0, scale: 0.96, y: compacto ? 32 : 46 }}
            transition={{ delay: 0.08, duration: compacto ? 0.62 : 0.75, ease: "easeOut" }}
            viewport={{ amount: 0.8, once: false }}
            whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
          >
            Productos destacados
          </motion.h2>
        </div>

        <div className={cn(
          "flex flex-wrap justify-center",
          compacto ? "mt-4 gap-[1cm]" : "mt-5 gap-6",
        )}>
          {loadingDestacados
            ? [0, 1, 2, 3].map((item) => (
                <TarjetaProductoDestacadoSkeleton compacto={compacto} key={item} />
              ))
            : productosDestacados.map((producto, index) => (
                <div
                  className={cn(
                    "h-full w-full",
                    compacto && "producto-destacado-gsap-card transform-gpu will-change-transform",
                    compacto
                      ? "max-w-[20rem] md:w-[calc(50%-0.5cm)] xl:w-[calc((100%-3cm)/4)] xl:max-w-none"
                      : "md:w-[calc(50%-0.75rem)] xl:w-[calc(25%-1.125rem)]",
                  )}
                  key={producto.idProducto}
                >
                  <motion.div
                    className="h-full w-full"
                    initial={{ filter: "blur(10px)", opacity: 0, scale: 0.94, y: compacto ? 54 : 82 }}
                    transition={{
                      delay: index * (compacto ? 0.1 : 0.16),
                      duration: compacto ? 0.62 : 0.78,
                      ease: "easeOut",
                    }}
                    viewport={{ amount: 0.35, once: false }}
                    whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
                  >
                    <TarjetaProductoDestacadoHome compacto={compacto} producto={producto} />
                  </motion.div>
                </div>
              ))}
        </div>

      </div>
    </section>
  )
}

export default ProductosDestacadosHome
