import ColeccionesSeleccionHome from "../components/home/ColeccionesSeleccionHome"
import EspecialesPremiumHome from "../components/home/EspecialesPremiumHome"
import HeroHomeFigulect from "../components/home/HeroHomeFigulect"
import ProductosDestacadosHome from "../components/home/ProductosDestacadosHome"

const Home = () => (
  <div className="-mx-6 -mt-16 bg-white">
    <HeroHomeFigulect />
    <ProductosDestacadosHome />
    <ColeccionesSeleccionHome />
    <EspecialesPremiumHome />
  </div>
)

export default Home
