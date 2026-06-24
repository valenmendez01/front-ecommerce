import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import seleccionAlemania from "../../../assets/home/selecciones/seleccion-alemania.png"
import seleccionArgentina from "../../../assets/home/selecciones/seleccion-argentina.png"
import seleccionBrasil from "../../../assets/home/selecciones/seleccion-brasil.png"
import seleccionColombia from "../../../assets/home/selecciones/seleccion-colombia.png"
import seleccionCroacia from "../../../assets/home/selecciones/seleccion-croacia.png"
import seleccionEspana from "../../../assets/home/selecciones/seleccion-espana.png"
import seleccionFrancia from "../../../assets/home/selecciones/seleccion-francia.png"
import seleccionInglaterra from "../../../assets/home/selecciones/seleccion-inglaterra.png"
import seleccionNoruega from "../../../assets/home/selecciones/seleccion-noruega.png"
import seleccionPaisesBajos from "../../../assets/home/selecciones/seleccion-paises-bajos.png"
import seleccionPortugal from "../../../assets/home/selecciones/seleccion-portugal.png"
import InfiniteMovingCards from "../../ui/infinite-moving-cards"
import { cn } from "../../../lib/utils"

const selecciones = [
  { color: "from-sky-300/25", imagen: seleccionArgentina, nombre: "Argentina", texto: "Campeones, doradas y figuritas nacionales.", valor: "ARGENTINA" },
  { color: "from-zinc-300/25", imagen: seleccionAlemania, nombre: "Alemania", texto: "Historia, potencia y grandeza.", valor: "ALEMANIA" },
  { color: "from-yellow-300/25", imagen: seleccionBrasil, nombre: "Brasil", texto: "Talento, brillo y figuritas que vuelan.", valor: "BRASIL" },
  { color: "from-yellow-400/25", imagen: seleccionColombia, nombre: "Colombia", texto: "Color, ritmo y figuritas que levantan cualquier álbum.", valor: "COLOMBIA" },
  { color: "from-orange-500/20", imagen: seleccionCroacia, nombre: "Croacia", texto: "Magia de mitad de cancha para coleccionar.", valor: "CROACIA" },
  { color: "from-red-400/20", imagen: seleccionEspana, nombre: "España", texto: "Nueva generación para completar primero.", valor: "ESPAÑA" },
  { color: "from-blue-500/20", imagen: seleccionFrancia, nombre: "Francia", texto: "Velocidad, potencia y favoritos modernos.", valor: "FRANCIA" },
  { color: "from-orange-400/25", imagen: seleccionPaisesBajos, nombre: "Holanda", texto: "Elegancia defensiva y presencia premium.", valor: "HOLANDA" },
  { color: "from-red-300/25", imagen: seleccionInglaterra, nombre: "Inglaterra", texto: "Novedades, potencia y nombres de élite.", valor: "INGLATERRA" },
  { color: "from-blue-300/25", imagen: seleccionNoruega, nombre: "Noruega", texto: "Goles, fuerza y figuritas de impacto.", valor: "NORUEGA" },
  { color: "from-red-500/20", imagen: seleccionPortugal, nombre: "Portugal", texto: "Cracks historicos y figuritas infaltables.", valor: "PORTUGAL" },
]

const ColeccionesSeleccionHome = ({ compacto = false }) => {
  const [direccion, setDireccion] = useState("right")

  const cambiarDireccionSegunCursor = (event) => {
    const seccion = event.currentTarget.getBoundingClientRect()
    const mitad = seccion.left + seccion.width / 2
    setDireccion(event.clientX < mitad ? "left" : "right")
  }

  return (
  <section
    className={cn("bg-[#f7f5ef] px-6 text-green-primary", compacto ? "py-8" : "py-20")}
    onMouseLeave={() => setDireccion("right")}
    onMouseMove={cambiarDireccionSegunCursor}
  >
    <div className={cn("mx-auto", compacto ? "max-w-[82rem]" : "max-w-7xl")}>
      <div className={cn("flex flex-col items-center text-center", compacto ? "gap-2" : "gap-6")}>
        <motion.p
          className={cn(
            "font-black uppercase text-dorado-primary",
            compacto ? "text-xs tracking-[0.28em]" : "text-sm tracking-[0.35em]",
          )}
          initial={{ filter: "blur(8px)", opacity: 0, y: 34 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ amount: 0.8, once: false }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        >
          Ruta mundialista
        </motion.p>
        <motion.h2
          className={cn(
            "font-display font-black uppercase leading-none tracking-wider",
            compacto ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl",
          )}
          initial={{ filter: "blur(10px)", opacity: 0, scale: 0.96, y: 46 }}
          transition={{ delay: 0.08, duration: 0.75, ease: "easeOut" }}
          viewport={{ amount: 0.8, once: false }}
          whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
        >
          Colecciones por selección
        </motion.h2>
      </div>

      <motion.div
        className={compacto ? "mt-5" : "mt-10"}
        initial={{ filter: "blur(10px)", opacity: 0, scale: 0.96, y: 82 }}
        transition={{ delay: 0.2, duration: 0.85, ease: "easeOut" }}
        viewport={{ amount: 0.35, once: false }}
        whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
      >
        <InfiniteMovingCards direction={direccion} pauseOnHover={false} speed="slow">
          {selecciones.map((seleccion) => (
            <motion.article
              className={cn(
                `group overflow-hidden border border-dorado-primary/35 bg-gradient-to-b ${seleccion.color} to-white shadow-lg`,
                compacto
                  ? "w-[280px] rounded-xl p-3 md:w-[300px] xl:w-[320px]"
                  : "w-[320px] rounded-2xl p-4 md:w-[360px] xl:w-[390px]",
              )}
              key={seleccion.nombre}
              whileHover={{ y: -8 }}
            >
              <div className={cn("aspect-[4/3] overflow-hidden bg-white/70", compacto ? "rounded-lg" : "rounded-xl")}>
                <img
                  alt={`Formacion de ${seleccion.nombre}`}
                  className="h-full w-full object-cover"
                  src={seleccion.imagen}
                />
              </div>
              <h3 className={cn("font-black", compacto ? "mt-3 text-xl" : "mt-5 text-2xl")}>{seleccion.nombre}</h3>
              <p className={cn("font-medium text-green-primary/65", compacto ? "mt-1 min-h-7 text-xs" : "mt-2 min-h-8 text-sm")}>
                {seleccion.texto}
              </p>
              <Link
                className={cn(
                  "inline-flex border-b border-dorado-primary pb-1 font-black text-dorado-primary",
                  compacto ? "mt-2 text-xs" : "mt-3 text-sm",
                )}
                to={`/productos?seleccion=${encodeURIComponent(seleccion.valor)}`}
              >
                Explorar colección
              </Link>
            </motion.article>
          ))}
        </InfiniteMovingCards>
      </motion.div>
    </div>
  </section>
  )
}

export default ColeccionesSeleccionHome
