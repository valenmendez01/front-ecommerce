import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

const velocidades = {
  fast: 80,
  normal: 55,
  slow: 200,
}

const InfiniteMovingCards = ({
  children,
  className,
  direction = "left",
  pauseOnHover = true,
  speed = "normal",
}) => {
  const [direccionActual, setDireccionActual] = useState(direction)
  const contenidoRef = useRef(null)
  const direccionRef = useRef(direction === "right" ? 1 : -1)
  const offsetRef = useRef(0)
  const pausadoRef = useRef(false)

  useEffect(() => {
    direccionRef.current = direction === "right" ? 1 : -1
    setDireccionActual(direction)
  }, [direction])

  useEffect(() => {
    let frameId
    let tiempoAnterior = 0

    function moverCarrusel(tiempoActual) {
      if (!tiempoAnterior) tiempoAnterior = tiempoActual

      const segundos = (tiempoActual - tiempoAnterior) / 1000
      const contenido = contenidoRef.current
      const anchoCiclo = contenido ? contenido.scrollWidth / 2 : 0
      tiempoAnterior = tiempoActual

      if (contenido && anchoCiclo > 0 && !pausadoRef.current) {
        offsetRef.current += direccionRef.current * (velocidades[speed] || velocidades.normal) * segundos

        if (offsetRef.current > 0) {
          offsetRef.current -= anchoCiclo
        }

        if (offsetRef.current < -anchoCiclo) {
          offsetRef.current += anchoCiclo
        }

        contenido.style.transform = `translateX(${offsetRef.current}px)`
      }

      frameId = requestAnimationFrame(moverCarrusel)
    }

    frameId = requestAnimationFrame(moverCarrusel)

    return () => cancelAnimationFrame(frameId)
  }, [speed])

  function cambiarDireccion(nuevaDireccion) {
    direccionRef.current = nuevaDireccion === "right" ? 1 : -1
    setDireccionActual((actual) => (actual === nuevaDireccion ? actual : nuevaDireccion))
  }

  function manejarMovimientoMouse(event) {
    const posicion = event.currentTarget.getBoundingClientRect()
    const limiteIzquierdo = posicion.left + posicion.width * 0.42
    const limiteDerecho = posicion.left + posicion.width * 0.58

    if (event.clientX < limiteIzquierdo) {
      cambiarDireccion("left")
    }

    if (event.clientX > limiteDerecho) {
      cambiarDireccion("right")
    }
  }

  function restaurarDireccion() {
    cambiarDireccion(direction)
    pausadoRef.current = false
  }

  function pausarSiCorresponde() {
    pausadoRef.current = pauseOnHover
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={pausarSiCorresponde}
      onMouseLeave={restaurarDireccion}
      onMouseMove={manejarMovimientoMouse}
    >
      <div
        ref={contenidoRef}
        className="flex w-max gap-5 will-change-transform"
        data-direction={direccionActual}
      >
        <div className="flex gap-5">{children}</div>
        <div aria-hidden="true" className="flex gap-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default InfiniteMovingCards
