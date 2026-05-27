import HeaderPanelUsuario from "../panelUsuario/estructura/HeaderPanelUsuario";

export default function HeaderCompra({ alVolverCarrito }) {
  return <HeaderPanelUsuario accion={alVolverCarrito} textoAccion="Volver carrito" />;
}
