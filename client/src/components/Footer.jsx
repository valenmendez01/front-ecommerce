import { Link } from "react-router-dom"
import logo from "../assets/logoHorizontal.png"
import { IconoRedSocial } from "./footer/IconoRedSocial"

const NAV_LINKS = [
  { label: "Catálogo", to: "/productos" },
  { label: "Novedades", to: "#" },
  { label: "Preguntas frecuentes", to: "#" },
  { label: "Blog", to: "#" },
  { label: "Privacidad", to: "#" },
  { label: "Términos y condiciones", to: "#" },
]

const SOCIAL_LINKS = ["Twitter/X", "LinkedIn", "GitHub", "Facebook", "Instagram"]

export const Footer = () => (
  <footer className="w-full bg-green-primary pt-8 font-sans text-white">
    <div className="mx-auto max-w-5xl px-6">
      <div className="flex flex-col items-center gap-4 pb-6">
        <Link
          to="/"
          className="relative z-20 mr-4 flex items-center px-2 py-1 transition-all duration-300 hover:filter-[drop-shadow(0_0_6px_rgba(184,134,11,0.6))_drop-shadow(0_0_12px_rgba(184,134,11,0.3))]"
        >
          <img src={logo} alt="Logo" width={150} />
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="relative my-0 h-px">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-default-200 to-transparent" />
      </div>

      <div className="flex items-center justify-between py-4">
        <span className="text-xs text-white/70">© DevStudio UADE</span>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-white/70 transition-colors hover:text-white"
            >
              <IconoRedSocial label={label} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)
