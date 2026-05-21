export default function FooterCarrito() {
  const links = ["Politica de Privacidad", "Terminos", "Envios", "Contacto"];

  return (
    <footer className="bg-emerald-950 text-white/70 text-xs py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-black text-yellow-400 italic">FIGULLECT</span>

        <div className="flex gap-6">
          {links.map((link) => (
            <a key={link} href="#" className="hover:text-yellow-400 transition-colors">
              {link}
            </a>
          ))}
        </div>

        <span>2026 FIFA WORLD CUP COLLECTIBLES</span>
      </div>
    </footer>
  );
}
