import { cn } from "../../lib/utils"

const HoverBorderGradient = ({ children, className }) => (
  <div
    className={cn(
      "group relative inline-flex overflow-hidden rounded-full p-[1px]",
      "bg-[linear-gradient(90deg,rgba(202,165,110,0.45),rgba(20,43,16,0.2),rgba(202,165,110,0.45))]",
      className,
    )}
  >
    <span className="absolute inset-0 translate-x-[-110%] bg-[linear-gradient(90deg,transparent,rgba(202,165,110,0.95),transparent)] transition duration-700 group-hover:translate-x-[110%]" />
    <div className="relative w-full rounded-full bg-green-primary">{children}</div>
  </div>
)

export default HoverBorderGradient
