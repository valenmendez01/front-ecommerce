import { motion } from 'framer-motion'
import { useSidebar } from '../../ui/sidebar'

const PerfilMenuVendedor = ({ iniciales, usuario }) => {
  const { open } = useSidebar()

  return (
    <div className="mb-8 border-b border-dorado-primary/35 pb-5">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-dorado-primary bg-white text-sm font-black text-green-primary">
          {iniciales}
        </div>
        <motion.div
          animate={{ display: open ? 'block' : 'none', opacity: open ? 1 : 0 }}
          className="min-w-0"
        >
          <p className="truncate font-black text-green-primary">
            {usuario.nombre} {usuario.apellido}
          </p>
          <p className="whitespace-nowrap text-xs font-semibold text-slate-500">
            Cuenta de vendedor
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default PerfilMenuVendedor
