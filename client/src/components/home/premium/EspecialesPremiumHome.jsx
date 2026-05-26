import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import album from "../../../assets/home/album-limpio.png"
import messiGold from "../../../assets/home/messi-gold.png"
import BackgroundBeams from "../../ui/background-beams"
import HoverBorderGradient from "../../ui/hover-border-gradient"
import SparklesCore from "../../ui/sparkles"

const EspecialesPremiumHome = () => (
  <section className="relative isolate overflow-hidden bg-green-primary px-6 py-20 text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(202,165,110,0.22),transparent_32%),linear-gradient(120deg,rgba(20,43,16,1),rgba(20,43,16,0.88))]" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-dorado-primary shadow-[0_0_18px_rgba(202,165,110,0.85)]" />
    <BackgroundBeams className="opacity-70" />
    <SparklesCore className="opacity-70" />

    <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr]">
      <div>
        <motion.p
          className="text-sm font-black uppercase tracking-[0.35em] text-dorado-primary"
          initial={{ filter: "blur(8px)", opacity: 0, y: 34 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ amount: 0.8, once: false }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        >
          Ediciones premium
        </motion.p>
        <motion.h2
          className="mt-4 text-4xl font-black uppercase leading-none md:text-6xl"
          initial={{ filter: "blur(10px)", opacity: 0, scale: 0.96, y: 46 }}
          transition={{ delay: 0.08, duration: 0.75, ease: "easeOut" }}
          viewport={{ amount: 0.8, once: false }}
          whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
        >
          Especiales para que tu coleccion tenga firma propia
        </motion.h2>
        <motion.p
          className="mt-6 max-w-xl text-lg font-medium leading-8 text-white/76"
          initial={{ filter: "blur(8px)", opacity: 0, y: 34 }}
          transition={{ delay: 0.16, duration: 0.7, ease: "easeOut" }}
          viewport={{ amount: 0.8, once: false }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        >
          Extra stickers, doradas y productos unicos para transformar una compra en una pieza de coleccion.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, scale: 0.92, y: 34 }}
          transition={{ delay: 0.24, duration: 0.6, ease: "easeOut" }}
          viewport={{ amount: 0.8, once: false }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
        >
          <HoverBorderGradient>
            <Link
              className="block rounded-full bg-dorado-primary px-6 py-3 text-sm font-black uppercase text-green-primary transition hover:bg-white"
              to="/productos"
            >
              Ver especiales
            </Link>
          </HoverBorderGradient>
          <Link
            className="rounded-full border border-dorado-primary/45 px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-dorado-primary hover:text-green-primary"
            to="/productos"
          >
            Explorar catalogo
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="relative min-h-[500px]"
        initial={{ filter: "blur(10px)", opacity: 0, scale: 0.94, y: 82 }}
        transition={{ delay: 0.18, duration: 0.85, ease: "easeOut" }}
        viewport={{ amount: 0.35, once: false }}
        whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
      >
        <motion.img
          alt="Album del Mundial 2026"
          className="absolute right-0 top-8 w-72 rotate-6 object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.55)] md:w-96"
          src={album}
          whileHover={{ rotate: 3, scale: 1.04 }}
        />
        <motion.img
          alt="Extra sticker dorado de Lionel Messi"
          className="absolute bottom-0 left-2 w-44 -rotate-6 object-contain drop-shadow-[0_22px_45px_rgba(0,0,0,0.5)] md:left-16 md:w-60"
          src={messiGold}
          whileHover={{ rotate: -3, scale: 1.04 }}
        />
      </motion.div>
    </div>
  </section>
)

export default EspecialesPremiumHome
