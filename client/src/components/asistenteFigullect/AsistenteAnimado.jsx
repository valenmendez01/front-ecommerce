import { AnimatePresence, motion } from 'framer-motion'

const transicionBoton = { duration: 0.22, ease: 'easeOut' }
const transicionVentana = { duration: 0.28, ease: 'easeOut', layout: { duration: 0.32 } }

export const AsistenteAnimado = ({ abierto, boton, ventana }) => (
  <AnimatePresence mode="wait">
    {!abierto ? (
      <motion.div
        key="asistente-boton"
        layoutId="asistente-figullect"
        className="fixed bottom-6 right-6 z-[70]"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={transicionBoton}
      >
        {boton}
      </motion.div>
    ) : (
      <motion.div
        key="asistente-ventana"
        layoutId="asistente-figullect"
        className="fixed bottom-6 right-6 z-[70]"
        initial={{ opacity: 0.4, scale: 0.88, transformOrigin: 'bottom right' }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={transicionVentana}
      >
        {ventana}
      </motion.div>
    )}
  </AnimatePresence>
)
