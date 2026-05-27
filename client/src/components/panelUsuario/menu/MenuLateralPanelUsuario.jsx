import MenuLateralCliente from './MenuLateralCliente'
import MenuLateralVendedor from './MenuLateralVendedor'

const obtenerIniciales = (usuario) =>
  `${usuario.nombre?.[0] || ''}${usuario.apellido?.[0] || ''}`.toUpperCase()

const MenuLateralPanelUsuario = ({ usuario }) => {
  const rolCuenta = usuario.rol === 'VENDEDOR' ? 'vendedor' : 'cliente'
  const iniciales = obtenerIniciales(usuario)

  if (usuario.rol === 'VENDEDOR') {
    return <MenuLateralVendedor iniciales={iniciales} usuario={usuario} />
  }

  return (
    <MenuLateralCliente
      iniciales={iniciales}
      rolCuenta={rolCuenta}
      usuario={usuario}
    />
  )
}

export default MenuLateralPanelUsuario
