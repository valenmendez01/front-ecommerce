import Navigation from './Navigation'
import { StickyBanner } from './ui/sticky-banner'

const EncabezadoGeneral = () => (
  <div className="sticky top-0 z-50 grid" style={{ gridTemplateRows: 'auto auto' }}>
    <StickyBanner className="bg-linear-to-b from-dorado-primary to-dorado-primary/90">
      <p className="text-sm text-white drop-shadow-md">
        ⚡ ¡Comprá hoy y recibí tu pedido <b>en menos de 24 hs</b>!
      </p>
    </StickyBanner>
    <Navigation />
  </div>
)

export default EncabezadoGeneral
