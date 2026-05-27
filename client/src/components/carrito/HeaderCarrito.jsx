import HeaderPanelUsuario from "../panelUsuario/estructura/HeaderPanelUsuario";

export default function HeaderCarrito({ alVolverInicio }) {
  return <HeaderPanelUsuario accion={alVolverInicio} textoAccion="Volver inicio" />;
}
