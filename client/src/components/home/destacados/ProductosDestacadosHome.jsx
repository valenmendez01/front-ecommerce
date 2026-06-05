import { motion } from "framer-motion"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductosDestacadosHome } from "../../../redux/homeSlice"
import TarjetaProductoDestacadoHome from "./TarjetaProductoDestacadoHome"
import TarjetaProductoDestacadoSkeleton from "./TarjetaProductoDestacadoSkeleton"

const ProductosDestacadosHome = () => {
  const dispatch = useDispatch()
  const { productosDestacados, loadingDestacados } = useSelector((state) => state.home)

  useEffect(() => {
    dispatch(fetchProductosDestacadosHome())
  }, [dispatch])

  if (!loadingDestacados && productosDestacados.length === 0) return null

  return (
    <section className="bg-white px-6 py-24 text-green-primary">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <motion.p
            className="text-sm font-black uppercase tracking-[0.35em] text-dorado-primary"
            initial={{ filter: "blur(8px)", opacity: 0, y: 34 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ amount: 0.8, once: false }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          >
            Favoritos de colección
          </motion.p>
          <motion.h2
            className="text-4xl font-black uppercase leading-none md:text-6xl"
            initial={{ filter: "blur(10px)", opacity: 0, scale: 0.96, y: 46 }}
            transition={{ delay: 0.08, duration: 0.75, ease: "easeOut" }}
            viewport={{ amount: 0.8, once: false }}
            whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
          >
            Productos destacados
          </motion.h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {loadingDestacados
            ? [0, 1, 2, 3].map((item) => <TarjetaProductoDestacadoSkeleton key={item} />)
            : productosDestacados.map((producto, index) => (
                <motion.div
                  className="h-full w-full md:w-[calc(50%-0.75rem)] xl:w-[calc(25%-1.125rem)]"
                  initial={{ filter: "blur(10px)", opacity: 0, scale: 0.94, y: 82 }}
                  key={producto.idProducto}
                  transition={{
                    delay: index * 0.16,
                    duration: 0.78,
                    ease: "easeOut",
                  }}
                  viewport={{ amount: 0.35, once: false }}
                  whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
                >
                  <TarjetaProductoDestacadoHome producto={producto} />
                </motion.div>
              ))}
        </div>

      </div>
    </section>
  )
}

export default ProductosDestacadosHome
