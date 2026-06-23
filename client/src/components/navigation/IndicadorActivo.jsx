import { motion } from "framer-motion"

export const IndicadorActivo = ({ activo, className = "" }) => (
  <motion.span
    className={`absolute bottom-0 h-0.5 rounded-full bg-dorado-primary ${className}`}
    initial={{ width: "0%", x: "-50%" }}
    animate={{
      width: activo ? "100%" : "0%",
      x: "-50%",
      filter: activo
        ? "drop-shadow(0 0 4px #b8860b) drop-shadow(0 0 8px #b8860b)"
        : "drop-shadow(0 0 0px transparent)",
    }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  />
)
