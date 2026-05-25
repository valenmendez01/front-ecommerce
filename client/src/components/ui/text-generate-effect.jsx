import { motion } from "motion/react"
import { cn } from "../../lib/utils"

const TextGenerateEffect = ({ className, words }) => {
  const palabras = words.split(" ")

  return (
    <p className={cn("flex flex-wrap", className)}>
      {palabras.map((palabra, index) => (
        <motion.span
          animate={{ filter: "blur(0px)", opacity: 1 }}
          className="mr-1.5"
          initial={{ filter: "blur(8px)", opacity: 0 }}
          key={`${palabra}-${index}`}
          transition={{ delay: index * 0.05, duration: 0.45 }}
        >
          {palabra}
        </motion.span>
      ))}
    </p>
  )
}

export default TextGenerateEffect
