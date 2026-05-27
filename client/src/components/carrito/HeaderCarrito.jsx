import HeaderPanelUsuario from "../panelUsuario/HeaderPanelUsuario";

export default function HeaderCarrito({ alVolverInicio }) {
  return <HeaderPanelUsuario accion={alVolverInicio} textoAccion="Volver inicio" />;
}
