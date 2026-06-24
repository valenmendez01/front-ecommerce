import { normalizarEntradaNumerica } from '../datos/numerosCrearProducto'

const CampoNumericoCrearProducto = ({ campo, className, maximo, onCambiar, placeholder, valor }) => {
  const cambiarValor = (event) => {
    const valorNormalizado = normalizarEntradaNumerica(event.currentTarget.value, maximo, valor)
    event.currentTarget.value = valorNormalizado
    onCambiar(campo, valorNormalizado)
  }

  return (
    <input
      className={className}
      inputMode="numeric"
      maxLength={String(maximo).length}
      pattern="[0-9]*"
      placeholder={placeholder}
      type="text"
      value={valor}
      onChange={cambiarValor}
    />
  )
}

export default CampoNumericoCrearProducto
