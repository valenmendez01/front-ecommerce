import { motion } from "framer-motion"
import album from "../../assets/home/album-limpio.png"
import cristiano from "../../assets/home/cristiano.png"
import haaland from "../../assets/home/haaland.png"
import harryKane from "../../assets/home/harry-kane.png"
import lamineYamal from "../../assets/home/lamine-yamal.png"
import lautaro from "../../assets/home/lautaro-cocacola.png"
import logoEscudo from "../../assets/home/logo-escudo.jpeg"
import lukaModric from "../../assets/home/luka-modric.png"
import mbappe from "../../assets/home/mbappe.png"
import messiGold from "../../assets/home/messi-gold.png"
import neymar from "../../assets/home/neymar.png"
import vanDijk from "../../assets/home/van-dijk.png"
import SparklesCore from "../ui/sparkles"
import FiguritaFlotante from "./FiguritaFlotante"

const figuritas = [
  { alt: "Figurita de Lionel Messi", className: "left-[4%] top-[11%] w-24 sm:w-28 lg:w-32", demora: 0, duracion: 6, src: messiGold },
  { alt: "Figurita de Luka Modric", className: "left-[28%] top-[7%] hidden w-24 lg:block lg:w-28", demora: 0.35, duracion: 5.7, src: lukaModric },
  { alt: "Figurita de Lamine Yamal", className: "left-[50%] top-[7%] hidden w-24 lg:block lg:w-28", demora: 1.1, duracion: 5.6, src: lamineYamal },
  { alt: "Figurita de Cristiano Ronaldo", className: "right-[2%] top-[12%] w-24 sm:w-28 lg:w-32", demora: 0.5, duracion: 5.2, src: cristiano },
  { alt: "Figurita de Harry Kane", className: "right-[4%] top-[38%] hidden w-24 lg:block lg:w-28", demora: 0.85, duracion: 6.2, src: harryKane },
  { alt: "Figurita de Neymar", className: "bottom-[19%] left-[5%] hidden w-24 sm:block lg:w-28", demora: 0.9, duracion: 5.8, src: neymar },
  { alt: "Figurita de Virgil Van Dijk", className: "left-[18%] top-[46%] hidden w-24 lg:block lg:w-28", demora: 1.25, duracion: 6, src: vanDijk },
  { alt: "Figurita de Kylian Mbappe", className: "bottom-[3%] left-[28%] hidden w-24 lg:block lg:w-28", demora: 0.2, duracion: 6.4, src: mbappe },
  { alt: "Figurita de Erling Haaland", className: "bottom-[2%] left-[50%] hidden w-24 lg:block lg:w-28", demora: 0.7, duracion: 6.1, src: haaland },
  { alt: "Figurita de Lautaro Martinez", className: "bottom-[14%] right-[13%] w-24 sm:w-28 lg:w-32", demora: 0.15, duracion: 6.3, src: lautaro },
]

const EscenaHeroColeccion = () => (
  <div className="relative min-h-[420px] w-full overflow-visible lg:min-h-[620px]">
    <img
      alt=""
      className="absolute left-1/2 top-1/2 h-[98%] w-[98%] -translate-x-1/2 -translate-y-1/2 rounded-[48%] object-cover opacity-25 contrast-150 saturate-125 drop-shadow-[0_0_34px_rgba(202,165,110,0.4)]"
      src={logoEscudo}
    />
    <div className="absolute inset-x-[15%] top-[18%] h-[62%] rounded-full border border-dorado-primary/40 shadow-[inset_0_0_70px_rgba(202,165,110,0.08)]" />
    <div className="absolute inset-x-[8%] top-[11%] h-[78%] rounded-full border border-white/14" />
    <SparklesCore className="inset-[8%] z-10 opacity-90" />

    <motion.img
      alt="Album de figuritas del Mundial 2026"
      animate={{ opacity: 1, rotate: -4, scale: 1, y: 0 }}
      className="absolute left-1/2 top-1/2 z-10 w-64 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_30px_65px_rgba(0,0,0,0.62)] sm:w-80 lg:w-[430px]"
      initial={{ opacity: 0, rotate: -12, scale: 0.8, y: 60 }}
      src={album}
      transition={{ delay: 0.25, duration: 1, ease: "easeOut" }}
    />

    {figuritas.map((figurita) => (
      <FiguritaFlotante key={figurita.alt} {...figurita} />
    ))}
  </div>
)

export default EscenaHeroColeccion
