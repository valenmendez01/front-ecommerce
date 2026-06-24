import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useSelector } from "react-redux"
import ColeccionesSeleccionHome from "../components/home/colecciones/ColeccionesSeleccionHome"
import ProductosDestacadosHome from "../components/home/destacados/ProductosDestacadosHome"
import EspecialesPremiumHome from "../components/home/premium/EspecialesPremiumHome"
import HeroGsap from "../components/home/hero/HeroGsap"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Home = () => {
  const contenedor = useRef(null)
  const cantidadDestacados = useSelector((state) => state.home.productosDestacados.length)

  useGSAP(() => {
    const buscar = gsap.utils.selector(contenedor)
    const panelProductos = buscar(".productos-gsap-panel")[0]
    const panelColecciones = buscar(".colecciones-gsap-panel")[0]
    const panelPremium = buscar(".premium-gsap-panel")[0]
    const escenaTransicion = buscar(".productos-colecciones-gsap-escena")[0]

    if (panelProductos) {
      gsap.set(buscar(".productos-gsap-contenido"), { opacity: 0.92, y: 26 })

      gsap.timeline({
        scrollTrigger: {
          trigger: panelProductos,
          start: "top bottom+=80",
          end: "top 38%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(buscar(".productos-gsap-contenido"), {
          ease: "none",
          opacity: 1,
          y: 0,
        }, 0)
    }

    let mediaTransicion

    if (cantidadDestacados > 0 && escenaTransicion && panelProductos && panelColecciones) {
      const media = gsap.matchMedia()
      mediaTransicion = media

      media.add("(min-width: 1024px)", () => {
        const tarjetas = buscar(".producto-destacado-gsap-card")
        const encabezado = buscar(".productos-gsap-encabezado")
        const fondoIzquierdo = buscar(".productos-gsap-fondo-izquierdo")
        const fondoDerecho = buscar(".productos-gsap-fondo-derecho")
        const contenidoColecciones = buscar(".colecciones-gsap-contenido")

        gsap.set(panelColecciones, {
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        })
        gsap.set(contenidoColecciones, {
          opacity: 0.45,
          scale: 1.08,
          y: 34,
        })

        const transicion = gsap.timeline({
          scrollTrigger: {
            trigger: escenaTransicion,
            start: "top 104px",
            end: "+=120%",
            scrub: 0.75,
            pin: escenaTransicion,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        transicion
          .to(encabezado, {
            ease: "power2.in",
            opacity: 0,
            y: -76,
            duration: 0.26,
          }, 0.1)
          .to(tarjetas, {
            ease: "power2.inOut",
            opacity: 0,
            rotate: (indice) => indice < 2 ? -7 - indice * 2 : 7 + (indice - 2) * 2,
            scale: 0.9,
            xPercent: (indice) => indice < 2 ? -155 + indice * 22 : 133 + (indice - 2) * 22,
            duration: 0.55,
          }, 0.12)
          .to(fondoIzquierdo, {
            ease: "power2.inOut",
            xPercent: -102,
            duration: 0.56,
          }, 0.22)
          .to(fondoDerecho, {
            ease: "power2.inOut",
            xPercent: 102,
            duration: 0.56,
          }, 0.22)
          .to(panelColecciones, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power2.inOut",
            duration: 0.58,
          }, 0.2)
          .to(contenidoColecciones, {
            ease: "power2.out",
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
          }, 0.24)
          .set(panelProductos, {
            pointerEvents: "none",
          }, 0.52)
          .to(panelProductos, {
            autoAlpha: 0,
            duration: 0.1,
          }, 0.75)

        return () => transicion.scrollTrigger?.kill()
      })
    }

    if (panelPremium) {
      gsap.set(panelPremium, {
        y: 112,
      })
      gsap.set(buscar(".premium-gsap-contenido"), { opacity: 0.9, y: 44 })
      gsap.set(buscar(".premium-gsap-brillo"), { opacity: 0, scaleX: 0.42 })

      gsap.timeline({
        scrollTrigger: {
          trigger: panelPremium,
          start: "top bottom+=260",
          end: "top 30%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(panelPremium, {
          ease: "none",
          y: 0,
        }, 0)
        .to(buscar(".premium-gsap-contenido"), {
          ease: "none",
          opacity: 1,
          y: 0,
        }, 0.08)
        .to(buscar(".premium-gsap-brillo"), {
          ease: "none",
          opacity: 1,
          scaleX: 1,
        }, 0.12)
    }

    ScrollTrigger.refresh()
    return () => mediaTransicion?.revert()
  }, {
    dependencies: [cantidadDestacados],
    revertOnUpdate: true,
    scope: contenedor,
  })

  return (
    <div ref={contenedor} className="-mx-6 -mt-16 overflow-hidden bg-white">
      <div className="relative isolate overflow-hidden bg-green-primary">
        <HeroGsap />
        <div className="productos-colecciones-gsap-escena relative -mt-[58vh] overflow-hidden rounded-t-[2rem] bg-white lg:grid">
          <section className="productos-gsap-panel relative z-20 transform-gpu overflow-hidden rounded-t-[2rem] text-green-primary shadow-[0_-34px_100px_rgba(3,10,2,0.42)] will-change-transform lg:col-start-1 lg:row-start-1">
            <div className="productos-gsap-fondo-izquierdo pointer-events-none absolute inset-y-0 left-0 z-0 w-[calc(50%+1px)] bg-white" />
            <div className="productos-gsap-fondo-derecho pointer-events-none absolute inset-y-0 right-0 z-0 w-[calc(50%+1px)] bg-white" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-[linear-gradient(180deg,rgba(202,165,110,0.32)_0%,rgba(255,255,255,0)_78%)]" />
            <div className="productos-gsap-contenido relative z-10 transform-gpu will-change-transform">
              <ProductosDestacadosHome compacto />
            </div>
          </section>

          <section className="colecciones-gsap-panel relative z-10 transform-gpu overflow-hidden rounded-t-[2rem] bg-[#f7f5ef] text-green-primary shadow-[0_-34px_100px_rgba(20,43,16,0.2)] will-change-transform lg:col-start-1 lg:row-start-1">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-[linear-gradient(180deg,rgba(20,43,16,0.18)_0%,rgba(202,165,110,0.16)_38%,rgba(247,245,239,0)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-dorado-primary/70 shadow-[0_0_26px_rgba(202,165,110,0.62)]" />
            <div className="pointer-events-none absolute inset-x-0 top-6 z-0 select-none text-center font-display text-7xl font-black uppercase leading-none text-green-primary/[0.055] md:text-9xl">
              Selecciones
            </div>
            <div className="colecciones-gsap-contenido relative z-0 transform-gpu will-change-transform">
              <ColeccionesSeleccionHome compacto />
            </div>
          </section>
        </div>
      </div>

      <section className="premium-gsap-panel relative z-30 -mt-[20vh] transform-gpu overflow-hidden rounded-t-[2rem] bg-green-primary text-white shadow-[0_-40px_110px_rgba(3,10,2,0.34)] will-change-transform">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-[linear-gradient(180deg,rgba(202,165,110,0.34)_0%,rgba(20,43,16,0.42)_42%,rgba(20,43,16,0)_100%)]" />
        <div className="premium-gsap-brillo pointer-events-none absolute left-1/2 top-0 z-30 h-px w-[82%] origin-center -translate-x-1/2 bg-dorado-primary shadow-[0_0_30px_rgba(202,165,110,0.88)]" />
        <div className="pointer-events-none absolute inset-x-[12%] top-8 z-10 h-20 rounded-full bg-dorado-primary/12 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-8 z-0 select-none text-center font-display text-7xl font-black uppercase leading-none text-white/[0.055] md:text-9xl">
          Premium
        </div>
        <div className="premium-gsap-contenido relative z-0 transform-gpu will-change-transform">
          <EspecialesPremiumHome />
        </div>
      </section>
    </div>
  )
}

export default Home
