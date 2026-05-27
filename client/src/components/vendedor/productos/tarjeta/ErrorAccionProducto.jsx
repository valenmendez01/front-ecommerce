const ErrorAccionProducto = ({ mensaje }) => {
  if (!mensaje) return null

  return (
    <p className="mx-5 mb-5 rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
      {mensaje}
    </p>
  )
}

export default ErrorAccionProducto
