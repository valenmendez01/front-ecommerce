import ColeccionesSeleccionHome from "../components/home/colecciones/ColeccionesSeleccionHome"
import ProductosDestacadosHome from "../components/home/destacados/ProductosDestacadosHome"
import HeroHomeFigulect from "../components/home/hero/HeroHomeFigulect"
import EspecialesPremiumHome from "../components/home/premium/EspecialesPremiumHome"

const Home = () => (
  <div className="-mx-6 -mt-16 bg-white">
    <HeroHomeFigulect />
    <ProductosDestacadosHome />
    <ColeccionesSeleccionHome />
    <EspecialesPremiumHome />
  </div>
)

export default Home
