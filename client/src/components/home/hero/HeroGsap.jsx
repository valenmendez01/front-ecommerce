import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import cristiano from "../../../assets/home/figuritas/cristiano.png"
import haaland from "../../../assets/home/figuritas/haaland.png"
import harryKane from "../../../assets/home/figuritas/harry-kane.png"
import lamine from "../../../assets/home/figuritas/lamine-yamal.png"
import luisDiaz from "../../../assets/home/figuritas/luis-diaz.png"
import luka from "../../../assets/home/figuritas/luka-modric.png"
import mbappe from "../../../assets/home/figuritas/mbappe.png"
import musiala from "../../../assets/home/figuritas/musiala.png"
import neymar from "../../../assets/home/figuritas/neymar.png"
import vanDijk from "../../../assets/home/figuritas/van-dijk.png"
import logo from "../../../assets/logoHorizontal.png"
import lautaro from "../../../assets/home/figuritas-premium/lautaro-cocacola.png"
import messiGold from "../../../assets/home/figuritas-premium/messi-gold.png"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const posterFiguritas = [
  { alt: "Luka Modric", clase: "left-[6%] top-[12%] w-14 -rotate-5 sm:w-20 md:w-28 lg:w-32", lado: "left", src: luka },
  { alt: "Neymar Jr.", clase: "left-[21%] top-[35%] w-14 rotate-4 sm:w-20 md:w-28 lg:w-32", lado: "left", src: neymar },
  { alt: "Virgil Van Dijk", clase: "left-[6%] top-[38%] w-14 -rotate-3 sm:w-20 md:w-28 lg:w-32", lado: "left", src: vanDijk },
  { alt: "Cristiano Ronaldo", clase: "left-[21%] top-[63%] w-14 rotate-3 sm:w-20 md:w-28 lg:w-32", lado: "left", src: cristiano },
  { alt: "Harry Kane", clase: "left-[6%] top-[65%] w-14 -rotate-5 sm:w-20 md:w-28 lg:w-32", lado: "left", src: harryKane },
  { alt: "Jamal Musiala", clase: "right-[6%] top-[12%] w-14 rotate-5 sm:w-20 md:w-28 lg:w-32", lado: "right", src: musiala },
  { alt: "Lamine Yamal", clase: "right-[21%] top-[35%] w-14 -rotate-4 sm:w-20 md:w-28 lg:w-32", lado: "right", src: lamine },
  { alt: "Erling Haaland", clase: "right-[6%] top-[38%] w-14 rotate-3 sm:w-20 md:w-28 lg:w-32", lado: "right", src: haaland },
  { alt: "Kylian Mbappe", clase: "right-[21%] top-[63%] w-14 -rotate-3 sm:w-20 md:w-28 lg:w-32", lado: "right", src: mbappe },
  { alt: "Luis Diaz", clase: "right-[6%] top-[65%] w-14 rotate-5 sm:w-20 md:w-28 lg:w-32", lado: "right", src: luisDiaz },
]

const posterFiguritasCentro = [
  { alt: "Lionel Messi dorada", clase: "-rotate-3", src: messiGold },
  { alt: "Lautaro Martinez Coca-Cola", clase: "rotate-3", src: lautaro },
]

const tituloGradiente = {
  backgroundClip: "text",
  backgroundImage: "linear-gradient(90deg,#caa56e 0%,#fff2d7 46%,#35b36b 100%)",
  color: "transparent",
  WebkitBackgroundClip: "text",
}

const HeroGsap = () => {
  const seccion = useRef(null)
  const contenido = useRef(null)

  useGSAP(() => {
    const buscar = gsap.utils.selector(seccion)

    gsap.set(buscar(".hero-poster-media, .hero-poster-card, .hero-logo-main, .hero-scroll, .hero-release, .hero-transition"), {
      force3D: true,
      transformOrigin: "center center",
    })
    gsap.set(buscar(".hero-release"), { autoAlpha: 0, y: 80 })
    gsap.set(buscar(".hero-release-line"), { opacity: 0, y: 70 })
    gsap.set(buscar(".hero-transition"), { opacity: 0, yPercent: 60 })
    gsap.set(buscar(".hero-cinema-shade"), { opacity: 0 })

    gsap.timeline({
      scrollTrigger: {
        trigger: seccion.current,
        start: "top top",
        end: "+=185%",
        scrub: 0.65,
        pin: contenido.current,
        anticipatePin: 1,
      },
    })
      .to(buscar(".hero-poster-media"), {
        scale: 1.08,
        y: -28,
        duration: 0.42,
      }, 0)
      .to(buscar(".hero-poster-card"), {
        x: (index) => (posterFiguritas[index]?.lado === "left" ? -18 : 18),
        y: (index) => (index % 2 === 0 ? -26 : -16),
        stagger: 0.01,
        duration: 0.42,
      }, 0)
      .to(buscar(".hero-cinema-shade"), {
        opacity: 0.68,
        duration: 0.42,
      }, 0)
      .to(buscar(".hero-logo-main"), {
        opacity: 0,
        scale: 0.55,
        y: -170,
        duration: 0.28,
      }, 0.05)
      .to(buscar(".hero-scroll"), {
        opacity: 0,
        y: -40,
        duration: 0.2,
      }, 0.06)
      .to(buscar(".hero-release"), {
        autoAlpha: 1,
        y: 0,
        duration: 0.24,
      }, 0.22)
      .to(buscar(".hero-release-line"), {
        opacity: 1,
        y: 0,
        stagger: 0.045,
        duration: 0.28,
      }, 0.26)
      .to(buscar(".hero-release"), {
        autoAlpha: 0,
        y: -90,
        duration: 0.22,
      }, 0.66)
      .to(buscar(".hero-cinema-shade"), {
        opacity: 0.86,
        duration: 0.2,
      }, 0.68)
      .to(buscar(".hero-transition"), {
        opacity: 1,
        yPercent: 0,
        duration: 0.18,
      }, 0.78)
  }, { scope: seccion })

  return (
    <section ref={seccion} className="relative h-[270vh] overflow-hidden bg-[#070810] text-white">
      <div ref={contenido} className="relative min-h-screen overflow-hidden bg-[#070810]">
        <div className="hero-poster-media absolute inset-0 origin-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(202,165,110,0.34),transparent_28%),linear-gradient(180deg,#6aa7b4_0%,#d8b17b_33%,#142b10_66%,#070810_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,16,0.16)_0%,rgba(7,8,16,0)_42%,rgba(7,8,16,0.18)_100%)]" />
          <div className="absolute left-1/2 top-[52%] h-[660px] w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/18 bg-white/5 shadow-[inset_0_0_90px_rgba(255,255,255,0.08)]" />
          <div className="pointer-events-none absolute left-[-10%] top-[12%] z-10 h-px w-[48%] rotate-[-14deg] bg-dorado-primary/25" />
          <div className="pointer-events-none absolute bottom-[12%] right-[-8%] z-10 h-px w-[58%] rotate-[-14deg] bg-dorado-primary/25" />
          <div className="hero-poster-center-group absolute left-1/2 top-[49%] z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-4 sm:gap-6 md:gap-10">
            {posterFiguritasCentro.map((figurita) => (
              <img
                alt={figurita.alt}
                className={`hero-poster-center-card w-20 transform-gpu object-contain drop-shadow-[0_28px_74px_rgba(0,0,0,0.54)] will-change-transform sm:w-28 md:w-40 lg:w-44 ${figurita.clase}`}
                data-side="center"
                decoding="async"
                key={figurita.alt}
                loading="eager"
                src={figurita.src}
              />
            ))}
          </div>
          {posterFiguritas.map((figurita, index) => (
            <div
              className={`hero-poster-card absolute z-20 transform-gpu will-change-transform ${figurita.clase}`}
              data-side={figurita.lado}
              key={figurita.alt}
            >
              <motion.img
                alt={figurita.alt}
                animate={{ rotate: [-2, 2, -2], y: [0, -14, 0] }}
                className="block h-auto w-full rounded-2xl drop-shadow-[0_22px_27px_rgba(0,0,0,0.44)]"
                decoding="async"
                loading="eager"
                src={figurita.src}
                transition={{
                  delay: index * 0.16,
                  duration: 5.4 + (index % 4) * 0.25,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(7,8,16,0)_0%,rgba(7,8,16,0.12)_42%,rgba(7,8,16,0.44)_100%)]" />
        <div className="hero-cinema-shade absolute inset-0 bg-[#070810]" />

        <div className="hero-logo-main absolute inset-x-0 top-[10%] z-40 flex justify-center px-6 md:top-[8%]">
          <img
            alt="Logo de Figullect"
            className="w-[min(78vw,680px)] object-contain drop-shadow-[0_0_42px_rgba(202,165,110,0.42)]"
            decoding="async"
            loading="eager"
            src={logo}
          />
        </div>

        <div className="hero-scroll absolute inset-x-0 bottom-14 z-40 flex flex-col items-center gap-2 px-6 text-center md:bottom-16 lg:bottom-20">
          <p className="text-sm font-black uppercase tracking-[0.42em] text-white md:text-base lg:text-lg">
            Abrí sobres
          </p>
          <p className="text-base font-black uppercase tracking-[0.26em] text-dorado-primary md:text-lg lg:text-xl">
            Encontrá cracks
          </p>
          <div className="mt-1 h-4 w-4 rotate-45 border-b-2 border-r-2 border-white/80" />
        </div>

        <div className="hero-release absolute inset-0 z-30 grid place-items-center px-6 text-center">
          <div className="max-w-6xl">
            <h2 className="font-display text-5xl font-black uppercase leading-none md:text-7xl lg:text-8xl">
              <span className="hero-release-line block" style={tituloGradiente}>Coleccioná</span>
              <span className="hero-release-line block" style={tituloGradiente}>el Mundial</span>
              <span className="hero-release-line block" style={tituloGradiente}>2026</span>
            </h2>
            <p className="hero-release-line relative z-40 mx-auto mt-8 w-fit text-sm font-black uppercase tracking-[0.32em] text-white/90 drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)] md:text-base">
              Sobres · álbumes · figuritas · selecciones
            </p>
          </div>
        </div>

        <div className="hero-transition pointer-events-none absolute inset-x-0 bottom-0 z-50 h-[32vh]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,16,0)_0%,rgba(7,8,16,0.74)_46%,rgba(7,8,16,1)_100%)]" />
          <div className="absolute inset-x-[10%] bottom-10 h-16 rounded-full bg-dorado-primary/12 blur-3xl" />
        </div>
      </div>
    </section>
  )
}

export default HeroGsap
