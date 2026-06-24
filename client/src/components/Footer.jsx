import logo from "../assets/logoHorizontal.png"

const textosFooter = [
  "Preguntas frecuentes",
  "Términos y condiciones",
]

export const Footer = () => (
  <footer className="w-full border-t border-dorado-primary/35 bg-green-primary text-white">
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-4 sm:flex-row">
      <img
        alt="Figullect"
        className="w-32 object-contain"
        decoding="async"
        loading="lazy"
        src={logo}
      />

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/75">
        {textosFooter.map((texto, index) => (
          <span className="flex items-center gap-4" key={texto}>
            {index > 0 && (
              <span
                aria-hidden="true"
                className="hidden h-1 w-1 rounded-full bg-dorado-primary sm:block"
              />
            )}
            {texto}
          </span>
        ))}
      </div>
    </div>
  </footer>
)
