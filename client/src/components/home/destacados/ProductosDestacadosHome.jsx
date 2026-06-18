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
      "bg-white px-6 text-green-primary",
      compacto ? "pb-24 pt-6 lg:pb-28" : "pb-12 pt-7",
    )}>
      <div className="mx-auto max-w-7xl">
        <div className={cn(
          "flex flex-col items-center text-center",
          compacto ? "gap-1" : "gap-2",
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
              compacto ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl",
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
          compacto ? "mt-4 gap-4" : "mt-5 gap-6",
        )}>
          {loadingDestacados
            ? [0, 1, 2, 3].map((item) => (
                <TarjetaProductoDestacadoSkeleton compacto={compacto} key={item} />
              ))
            : productosDestacados.map((producto, index) => (
                <motion.div
                  className={cn(
                    "h-full w-full",
                    compacto && "producto-destacado-gsap-card transform-gpu will-change-transform",
                    compacto
                      ? "md:w-[calc(50%-0.5rem)] xl:w-[calc(25%-0.75rem)]"
                      : "md:w-[calc(50%-0.75rem)] xl:w-[calc(25%-1.125rem)]",
                  )}
                  initial={{ filter: "blur(10px)", opacity: 0, scale: 0.94, y: compacto ? 54 : 82 }}
                  key={producto.idProducto}
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
              ))}
        </div>

      </div>
    </section>
  )
}

export default ProductosDestacadosHome
