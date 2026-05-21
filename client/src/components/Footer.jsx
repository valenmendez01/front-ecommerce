import { Link } from "react-router-dom";
import logo from "../assets/logoHorizontal.png" 

const NAV_LINKS = [
  { label: "Products", to: "#" },
  { label: "Studio", to: "#" },
  { label: "Clients", to: "#" },
  { label: "Pricing", to: "#" },
  { label: "Blog", to: "#" },
  { label: "Privacy", to: "#" },
  { label: "Terms", to: "#" },
];

const SOCIAL_LINKS = [
  {
    label: "Twitter/X",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 22 4.01 c -1 0.49 -1.98 0.689 -3 0.99 c -1.121 -1.265 -2.783 -1.335 -4.38 -0.737 s -2.643 2.06 -2.62 3.737 v 1 c -3.245 0.083 -6.135 -1.395 -8 -4 c 0 0 -4.182 7.433 4 11 c -1.872 1.247 -3.739 2.088 -6 2 c 3.308 1.803 6.913 2.423 10.034 1.517 c 3.58 -1.04 6.522 -3.723 7.651 -7.742 a 13.84 13.84 0 0 0 0.497 -3.753 c 0 -0.249 1.51 -2.772 1.818 -4.013 Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 4 4 m 0 2 a 2 2 0 0 1 2 -2 h 12 a 2 2 0 0 1 2 2 v 12 a 2 2 0 0 1 -2 2 h -12 a 2 2 0 0 1 -2 -2 Z" />
        <path d="M 8 11 l 0 5" />
        <path d="M 8 8 l 0 0.01" />
        <path d="M 12 16 l 0 -5" />
        <path d="M 16 16 v -3 a 2 2 0 0 0 -4 0" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 9 19 c -4.3 1.4 -4.3 -2.5 -6 -3 m 12 5 v -3.5 c 0 -1 0.1 -1.4 -0.5 -2 c 2.8 -0.3 5.5 -1.4 5.5 -6 a 4.6 4.6 0 0 0 -1.3 -3.2 a 4.2 4.2 0 0 0 -0.1 -3.2 s -1.1 -0.3 -3.5 1.3 a 12.3 12.3 0 0 0 -6.2 0 c -2.4 -1.6 -3.5 -1.3 -3.5 -1.3 a 4.2 4.2 0 0 0 -0.1 3.2 a 4.6 4.6 0 0 0 -1.3 3.2 c 0 4.6 2.7 5.7 5.5 6 c -0.6 0.6 -0.6 1.2 -0.5 2 v 3.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 7 10 v 4 h 3 v 7 h 4 v -7 h 3 l 1 -4 h -4 v -2 a 1 1 0 0 1 1 -1 h 3 v -4 h -3 a 5 5 0 0 0 -5 5 v 2 h -3" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 4 4 m 0 4 a 4 4 0 0 1 4 -4 h 8 a 4 4 0 0 1 4 4 v 8 a 4 4 0 0 1 -4 4 h -8 a 4 4 0 0 1 -4 -4 Z" />
        <path d="M 12 12 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0" />
        <path d="M 16.5 7.5 l 0 0.01" />
      </svg>
    ),
  },
];

export const Footer = () => {
  return (
    <footer className="w-full font-sans pt-8 bg-green-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-4 pb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Link to="/" className="relative z-20 mr-4 flex items-center px-2 py-1 transition-all duration-300 hover:filter-[drop-shadow(0_0_6px_rgba(184,134,11,0.6))_drop-shadow(0_0_12px_rgba(184,134,11,0.3))]">
              <img src={logo} alt="Logo" width={150} />
            </Link>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={label} to={to} className="text-sm text-white/70 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* línea con degradado */}
        <div className="relative h-px my-0">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-default-200 to-transparent" />
        </div>

        <div className="flex justify-between items-center py-4">
          <span className="text-xs text-white/70">© DevStudios LLABC</span>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map(({ label, icon, href }) => (
              <a key={label} href={href} aria-label={label} className="text-white/70 hover:text-white transition-colors">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};