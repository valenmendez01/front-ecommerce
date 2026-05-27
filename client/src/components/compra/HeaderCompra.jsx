import HeaderPanelUsuario from "../panelUsuario/HeaderPanelUsuario";

export default function HeaderCompra({ alVolverCarrito }) {
  return <HeaderPanelUsuario accion={alVolverCarrito} textoAccion="Volver carrito" />;
}
