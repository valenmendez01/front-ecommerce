import { motion } from "framer-motion"

const luzPrincipal =
  "radial-gradient(68% 68% at 50% 32%, rgba(202,165,110,0.34) 0%, rgba(202,165,110,0.09) 48%, transparent 78%)"
const luzSuave =
  "radial-gradient(50% 50% at 50% 50%, rgba(255,241,207,0.16) 0%, rgba(202,165,110,0.04) 72%, transparent 100%)"

const SpotlightNew = ({ className = "", gradientFirst = luzPrincipal, gradientSecond = luzSuave }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    <motion.div
      animate={{ opacity: [0.7, 1, 0.7], x: [-36, 24, -36] }}
      className="absolute -top-72 right-[-18%] h-[1180px] w-[720px] rotate-12"
      style={{ background: gradientFirst }}
      transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
    />
    <motion.div
      animate={{ opacity: [0.28, 0.68, 0.28], x: [28, -18, 28] }}
      className="absolute -top-80 left-[-28%] h-[1040px] w-[520px] -rotate-12"
      style={{ background: gradientSecond }}
      transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
    />
  </div>
)

export default SpotlightNew
