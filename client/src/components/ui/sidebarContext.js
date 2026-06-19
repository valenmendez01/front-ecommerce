import { createContext, useContext } from 'react'

export const SidebarContext = createContext(null)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) throw new Error('useSidebar debe usarse dentro de SidebarProvider')
  return context
}
