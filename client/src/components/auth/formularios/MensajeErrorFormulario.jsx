const MensajeErrorFormulario = ({ mensaje }) => {
  if (!mensaje) return null

  return (
    <div
      aria-live="polite"
      className="rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
    >
      {mensaje}
    </div>
  )
}

export default MensajeErrorFormulario
