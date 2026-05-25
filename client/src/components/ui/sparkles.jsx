import { motion } from "framer-motion"

const chispas = [
  ["8%", "17%", 4, 0], ["18%", "72%", 3, 0.5], ["27%", "36%", 5, 1.1],
  ["39%", "10%", 3, 1.5], ["47%", "83%", 4, 0.8], ["58%", "23%", 5, 1.8],
  ["69%", "68%", 3, 0.3], ["78%", "14%", 4, 1.2], ["87%", "48%", 5, 0.7],
  ["93%", "78%", 3, 1.6], ["64%", "91%", 4, 2], ["34%", "91%", 3, 1.3],
]

const SparklesCore = ({ className = "", color = "#caa56e" }) => (
  <div className={`pointer-events-none absolute inset-0 ${className}`}>
    {chispas.map(([left, top, size, delay]) => (
      <motion.span
        animate={{ opacity: [0, 1, 0], scale: [0.25, 1.35, 0.25] }}
        className="absolute rounded-full shadow-[0_0_18px_currentColor]"
        key={`${left}-${top}`}
        style={{ background: color, color, height: size, left, top, width: size }}
        transition={{ delay, duration: 2.8, ease: "easeInOut", repeat: Infinity }}
      />
    ))}
  </div>
)

export default SparklesCore
