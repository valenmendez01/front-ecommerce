import { createContext, useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

const SidebarContext = createContext(null)

export const SidebarProvider = ({ children, open, setOpen }) => {
  const [openState, setOpenState] = useState(false)
  const estaAbierta = open ?? openState
  const cambiarApertura = setOpen ?? setOpenState

  return (
    <SidebarContext.Provider value={{ open: estaAbierta, setOpen: cambiarApertura }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) throw new Error('useSidebar debe usarse dentro de SidebarProvider')
  return context
}

export const Sidebar = ({ children, className }) => (
  <SidebarProvider>
    <aside className={cn('h-full shrink-0 border-r border-dorado-primary/35 bg-white', className)}>
      {children}
    </aside>
  </SidebarProvider>
)

export const SidebarBody = ({ children, className }) => {
  const { open, setOpen } = useSidebar()

  return (
    <motion.div
      animate={{ width: open ? 320 : 88 }}
      className={cn('flex h-full flex-col overflow-hidden px-4 py-5', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </motion.div>
  )
}

export const SidebarLink = ({ active, children, className, icon: Icono, to }) => {
  const { open } = useSidebar()

  return (
    <Link
      className={cn(
        'group flex items-center gap-4 rounded-xl px-3 py-3 font-bold transition',
        active
          ? 'bg-green-primary text-white shadow-md ring-1 ring-dorado-primary/70'
          : 'text-green-primary hover:bg-dorado-primary/15',
        className,
      )}
      to={to}
    >
      <Icono className="h-5 w-5 shrink-0" strokeWidth={2.2} />
      <motion.span
        animate={{ display: open ? 'inline-block' : 'none', opacity: open ? 1 : 0 }}
        className="whitespace-nowrap text-sm"
      >
        {children}
      </motion.span>
    </Link>
  )
}
