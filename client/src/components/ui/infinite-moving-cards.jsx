import { cn } from "../../lib/utils"

const velocidades = {
  fast: "22s",
  normal: "38s",
  slow: "58s",
}

const InfiniteMovingCards = ({
  children,
  className,
  direction = "left",
  pauseOnHover = true,
  speed = "normal",
}) => {
  const animacion = direction === "right" ? "animate-scroll-right" : "animate-scroll-left"

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn("flex w-max gap-5", animacion, pauseOnHover && "hover:[animation-play-state:paused]")}
        style={{ "--animation-duration": velocidades[speed] || velocidades.normal }}
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
