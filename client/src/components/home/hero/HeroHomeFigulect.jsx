import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import BackgroundBeams from "../../ui/background-beams"
import HoverBorderGradient from "../../ui/hover-border-gradient"
import SpotlightNew from "../../ui/spotlight-new"
import TextGenerateEffect from "../../ui/text-generate-effect"
import EscenaHeroColeccion from "./EscenaHeroColeccion"

const textoHero =
  "Figuritas, álbumes y packs para completar esa colección que empieza con una carta y termina en historia."

const entradaContenedor = {
  oculto: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.16,
    },
  },
}

const entradaElemento = {
  oculto: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    transition: { duration: 0.72, ease: "easeOut" },
    y: 0,
  },
}

const entradaTitulo = {
  oculto: { opacity: 0, y: 46 },
  visible: {
    opacity: 1,
    transition: { duration: 0.85, ease: "easeOut" },
    y: 0,
  },
}

const HeroHomeFigulect = () => (
  <section className="relative isolate min-h-[calc(100vh-8rem)] overflow-hidden bg-green-primary text-white">
    <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(20,43,16,0.99)_0%,rgba(20,43,16,0.9)_43%,rgba(20,43,16,0.64)_100%)]" />
    <BackgroundBeams className="opacity-80" />
    <SpotlightNew />
    <div className="absolute inset-x-0 top-0 h-px bg-dorado-primary/80" />
    <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-6 px-6 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
      <motion.div
        animate="visible"
        className="z-20 max-w-xl"
        initial="oculto"
        variants={entradaContenedor}
      >
        <motion.h1
          className="font-display text-5xl uppercase leading-[0.92] text-white sm:text-6xl lg:text-8xl"
          variants={entradaTitulo}
        >
          <span className="block">Abrí sobres.</span>
          <span className="block">Encontrá cracks.</span>
        </motion.h1>
        <motion.div variants={entradaElemento}>
          <TextGenerateEffect
            className="mt-6 max-w-lg text-base leading-7 text-white/78 sm:text-lg"
            words={textoHero}
          />
        </motion.div>
        <motion.div className="mt-8 flex flex-wrap gap-3" variants={entradaElemento}>
          <HoverBorderGradient>
            <Link
              className="block rounded-full bg-dorado-primary px-6 py-3 text-sm font-black uppercase text-green-primary transition hover:bg-white"
              to="/productos"
            >
              Explorar catálogo
            </Link>
          </HoverBorderGradient>
          <Link
            className="rounded-full border border-dorado-primary/45 px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-dorado-primary hover:text-green-primary"
            to="/productos"
          >
            Ver packs
          </Link>
        </motion.div>
      </motion.div>

      <EscenaHeroColeccion />
    </div>
  </section>
)

export default HeroHomeFigulect
