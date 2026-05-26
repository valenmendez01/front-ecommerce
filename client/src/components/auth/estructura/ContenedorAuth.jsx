const ContenedorAuth = ({ children, columnas = 'lg:grid-cols-[1.05fr_0.95fr]' }) => (
  <section
    className={`grid overflow-hidden rounded-2xl border border-[#d8c49a] bg-white shadow-2xl shadow-[#142b10]/10 ${columnas}`}
  >
    {children}
  </section>
)

export default ContenedorAuth
