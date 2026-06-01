import { useEffect, useState } from "react";

import { obtenerImagenProducto } from "../../../lib/reglasCarrito";

const obtenerListaProductos = (respuesta) =>
  Array.isArray(respuesta) ? respuesta : respuesta?.content || [];

const obtenerIdProducto = (producto) => producto?.idProducto ?? producto?.id;
const obtenerTotalPaginas = (respuesta) => Number(respuesta?.totalPages || 1);

const tomarAleatorios = (productos, cantidad) => {
  const mezclados = [...productos];
  for (let indice = mezclados.length - 1; indice > 0; indice -= 1) {
    const aleatorio = Math.floor(Math.random() * (indice + 1));
    [mezclados[indice], mezclados[aleatorio]] = [mezclados[aleatorio], mezclados[indice]];
  }
  return mezclados.slice(0, cantidad);
};

const tomarVariados = (productos, cantidad) => {
  const grupos = tomarAleatorios(productos, productos.length).reduce((acumulador, producto) => {
    const grupo = producto.seleccion || producto.categoria || "SIN_GRUPO";
    acumulador[grupo] = [...(acumulador[grupo] || []), producto];
    return acumulador;
  }, {});
  const principales = tomarAleatorios(Object.values(grupos), Object.keys(grupos).length)
    .map((grupo) => grupo[0])
    .slice(0, cantidad);
  const idsElegidos = new Set(principales.map((producto) => producto.idProducto));
  const relleno = tomarAleatorios(
    productos.filter((producto) => !idsElegidos.has(producto.idProducto)),
    cantidad - principales.length,
  );
  return [...principales, ...relleno];
};

const normalizarProducto = (producto) => ({
  ...producto,
  id: obtenerIdProducto(producto),
  idProducto: obtenerIdProducto(producto),
  precio: Number(producto.precio ?? 0),
  descuento: Number(producto.descuento ?? 0),
  stock: Number(producto.stock ?? 0),
  subtitulo: producto.categoria || "RECOMENDADO",
  imagen: obtenerImagenProducto(producto),
});

export default function useProductosRecomendados(idsCarrito) {
  const [recomendados, setRecomendados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    const idsExcluidos = new Set(idsCarrito.split(",").filter(Boolean).map(Number));

    const cargarPagina = async (pagina) => {
      const respuesta = await fetch(`/productos?page=${pagina}&size=12`);
      const json = await respuesta.json();
      return json.data ?? json;
    };

    const cargarRecomendados = async () => {
      try {
        const primeraPagina = await cargarPagina(0);
        const totalPaginas = obtenerTotalPaginas(primeraPagina);
        const pagina = totalPaginas > 1 ? Math.floor(Math.random() * (totalPaginas - 1)) + 1 : 0;
        const otraPagina = pagina === 0 ? [] : await cargarPagina(pagina);
        const productos = [...obtenerListaProductos(primeraPagina), ...obtenerListaProductos(otraPagina)]
          .filter((producto) => {
            const idProducto = obtenerIdProducto(producto);
            return idProducto && !idsExcluidos.has(Number(idProducto)) && Number(producto.stock ?? 0) > 0;
          })
          .map(normalizarProducto);

        if (activo) setRecomendados(tomarVariados(productos, 3));
      } catch {
        if (activo) setRecomendados([]);
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargarRecomendados();
    return () => {
      activo = false;
    };
  }, [idsCarrito]);

  return { cargando, recomendados };
}
