import Navigation from '../Navigation'
import MenuLateral from './MenuLateral'

const PaginaGestion = ({
  children,
  claseContenido = 'max-w-7xl',
  mostrarMenuLateral = true,
  onCerrarSesion,
  usuario,
}) => (
  <div className="flex min-h-screen flex-col bg-white text-slate-950">
    <div className="sticky top-0 z-50">
      <Navigation />
    </div>

    <div className="flex flex-1">
      {mostrarMenuLateral && <MenuLateral usuario={usuario} onCerrarSesion={onCerrarSesion} />}

      <main className="flex flex-1 flex-col">
        <div className={`mx-auto w-full ${claseContenido} flex-1 px-8 py-10`}>{children}</div>
      </main>
    </div>
  </div>
)

export default PaginaGestion
