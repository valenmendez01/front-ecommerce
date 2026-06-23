import { Link } from "react-router-dom"
import logo from "../../assets/logoHorizontal.png"

export const LogoNav = () => (
  <Link
    to="/"
    className="relative z-20 mr-4 flex items-center px-2 py-1 transition-all duration-300 hover:filter-[drop-shadow(0_0_6px_rgba(184,134,11,0.6))_drop-shadow(0_0_12px_rgba(184,134,11,0.3))]"
  >
    <img src={logo} alt="Logo" width={150} />
  </Link>
)
