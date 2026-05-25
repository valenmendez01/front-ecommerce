import { CircleCheck, LoaderCircle } from 'lucide-react'
import { motion, useAnimate } from 'motion/react'
import { cn } from '../../lib/utils'

const StatefulButton = ({ children, className, disabled = false, onClick, type = 'button', ...props }) => {
  const [scope, animate] = useAnimate()

  const ocultar = (selector) =>
    animate(selector, { display: 'none', scale: 0, width: '0px' }, { duration: 0.2 })

  const mostrar = (selector) =>
    animate(selector, { display: 'block', scale: 1, width: '20px' }, { duration: 0.2 })

  const mostrarExito = async () => {
    await ocultar('.loader')
    await mostrar('.check')
    await animate('.check', { display: 'none', scale: 0, width: '0px' }, { delay: 2, duration: 0.2 })
  }

  const manejarClick = async (event) => {
    await mostrar('.loader')
    try {
      const resultado = await onClick?.(event)
      if (resultado === false) {
        await ocultar('.loader')
        return
      }
      await mostrarExito()
    } catch {
      await ocultar('.loader')
    }
  }

  return (
    <motion.button
      className={cn(
        'flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full bg-green-primary px-4 py-2 font-medium text-white ring-offset-2 transition duration-200 hover:ring-2 hover:ring-dorado-primary disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      disabled={disabled}
      layout
      ref={scope}
      type={type}
      onClick={manejarClick}
      {...props}
    >
      <motion.span className="flex items-center gap-2" layout>
        <motion.span
          className="loader hidden w-0 scale-0"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.3, ease: 'linear', repeat: Infinity }}
        >
          <LoaderCircle size={20} />
        </motion.span>
        <motion.span className="check hidden w-0 scale-0">
          <CircleCheck size={20} />
        </motion.span>
        <motion.span layout>{children}</motion.span>
      </motion.span>
    </motion.button>
  )
}

export default StatefulButton
