import BarraSuperior from './BarraSuperior'
import Footer from './Footer'
import MenuLateral from './MenuLateral'

const PaginaGestion = ({ children, onCerrarSesion, usuario }) => (
  <div className="min-h-screen bg-slate-50 text-slate-950">
    <BarraSuperior />

    <div className="flex min-h-[calc(100vh-4rem)]">
      <MenuLateral usuario={usuario} onCerrarSesion={onCerrarSesion} />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-8 py-10">{children}</div>
        <Footer />
      </main>
    </div>
  </div>
)

export default PaginaGestion
