import BarraSuperior from './BarraSuperior'
import Footer from './Footer'
import MenuLateral from './MenuLateral'

const PaginaGestion = ({ children, claseContenido = 'max-w-7xl', onCerrarSesion, usuario }) => (
  <div className="min-h-screen bg-white text-slate-950">
    <BarraSuperior usuario={usuario} />

    <div className="flex min-h-[calc(100vh-4rem)]">
      <MenuLateral usuario={usuario} onCerrarSesion={onCerrarSesion} />

      <main className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col">
        <div className={`mx-auto w-full ${claseContenido} flex-1 px-8 py-10`}>{children}</div>
        <Footer />
      </main>
    </div>
  </div>
)

export default PaginaGestion
