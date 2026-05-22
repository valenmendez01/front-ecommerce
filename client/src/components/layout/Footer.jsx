import logo from '../../assets/logoHorizontal.png'

const Footer = () => {
  return (
    <footer className="border-t border-[#d8c49a] bg-[#142b10] px-8 py-8 text-white">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <img className="h-10 w-auto" src={logo} alt="Figullect" />
        <p className="text-sm text-white/70">
          Proyecto académico · Aplicaciones Interactivas · 2026
        </p>
      </div>
    </footer>
  )
}

export default Footer
