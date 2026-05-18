import { useState } from "react";
import VistaCarrito from "./views/carritoView";
import VistaPago from "./views/compraView";

// Artículos de ejemplo — en tu app real vendrían de un contexto o store
const ARTICULOS_DEMO = [
  {
    id: "1",
    nombre: "Star Striker #07 - Gold Edition",
    subtitulo: "RARO HOLOGRÁFICO",
    precio: 89.0,
    precioOriginal: 125.0,
    cantidad: 1,
    etiqueta: "SHINY",
    badge: "PRECIO MATCH",
  },
  {
    id: "2",
    nombre: "Master Pack: 50 Stickers",
    subtitulo: "EDICIÓN ESTÁNDAR",
    precio: 24.0,
    cantidad: 2,
  },
];

export default function RaizTienda() {
  const [vista, setVista] = useState("carrito"); // "carrito" | "pago"
  const [articulos] = useState(ARTICULOS_DEMO);

  if (vista === "pago") {
    return (
      <VistaPago
        articulosIniciales={articulos}
        alVolver={() => setVista("carrito")}
      />
    );
  }

  return (
    <VistaCarrito
      alIrAlPago={() => setVista("pago")}
    />
  );
}