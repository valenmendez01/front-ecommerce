import BarraSuperior from './BarraSuperior'
import Footer from './Footer'
import MenuLateral from './MenuLateral'

const PaginaGestion = ({ children, onCerrarSesion, usuario }) => (
  <div className="min-h-screen bg-slate-50 text-slate-950">
    <BarraSuperior usuario={usuario} />

    <div className="flex min-h-[calc(100vh-4rem)]">
      <MenuLateral usuario={usuario} onCerrarSesion={onCerrarSesion} />

      <main className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col">
        <div className="mx-auto w-full max-w-7xl flex-1 px-8 py-10">{children}</div>
        <Footer />
      </main>
    </div>
  </div>
)

export default PaginaGestion
