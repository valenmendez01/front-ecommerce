import { motion } from "framer-motion"

const FiguritaFlotante = ({ alt, demora, duracion, src, className }) => (
  <motion.img
    alt={alt}
    animate={{ rotate: [-3, 2, -3], y: [0, -16, 0] }}
    className={`absolute z-20 rounded-xl object-contain drop-shadow-2xl ${className}`}
    src={src}
    transition={{
      delay: demora,
      duration: duracion,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  />
)

export default FiguritaFlotante
