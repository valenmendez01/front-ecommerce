import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProductos, fetchProductosFiltrados } from "../redux/catalogoSlice";

const PAGE_SIZE = 9;
const PRECIO_MAXIMO = 300000;

function obtenerFiltrosDesdeUrl(search, nombreSingular, nombrePlural) {
  const parametros = new URLSearchParams(search);
  return [...parametros.getAll(nombreSingular), ...parametros.getAll(nombrePlural)];
}

function obtenerPaginaDesdeUrl(search) {
  const paginaUrl = Number(new URLSearchParams(search).get("pagina"));
  return Number.isFinite(paginaUrl) && paginaUrl > 0 ? paginaUrl - 1 : 0;
}

function crearParamsCatalogo({ busqueda, categorias, pagina, precioMax, precioMin, selecciones }) {
  const params = new URLSearchParams();
  params.set("page", pagina);
  params.set("size", PAGE_SIZE);
  if (busqueda.trim()) params.set("nombre", busqueda.trim());
  if (precioMin > 0) params.set("min", precioMin);
  if (precioMax < PRECIO_MAXIMO) params.set("max", precioMax);
  [...categorias].sort().forEach((categoria) => params.append("categorias", categoria));
  [...selecciones].sort().forEach((seleccion) => params.append("selecciones", seleccion));
  return params.toString();
}

export const useCatalogo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filtro, loading, productos, productosPorConsulta, totalPaginas } = useSelector((state) => state.productos);
  const [categorias, setCategorias] = useState(() => obtenerFiltrosDesdeUrl(location.search, "categoria", "categorias"));
  const [selecciones, setSelecciones] = useState(() => obtenerFiltrosDesdeUrl(location.search, "seleccion", "selecciones"));
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(PRECIO_MAXIMO);
  const [precioMinDebounced, setPrecioMinDebounced] = useState(0);
  const [precioMaxDebounced, setPrecioMaxDebounced] = useState(PRECIO_MAXIMO);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(() => obtenerPaginaDesdeUrl(location.search));
  const hayFiltros = categorias.length > 0 || selecciones.length > 0 || busqueda.trim() !== "" || precioMinDebounced > 0 || precioMaxDebounced < PRECIO_MAXIMO;
  const claveBase = `page=${pagina}&size=${PAGE_SIZE}`;
  const paramsFiltro = crearParamsCatalogo({ busqueda, categorias, pagina, precioMax: precioMaxDebounced, precioMin: precioMinDebounced, selecciones });
  const paginaBaseCacheada = productosPorConsulta[claveBase];
  const paginaFiltroCacheada = filtro.productosPorConsulta[paramsFiltro];
  const cargando = hayFiltros ? filtro.loading && !paginaFiltroCacheada : loading && !paginaBaseCacheada;
  const productosAMostrar = hayFiltros ? paginaFiltroCacheada?.productos || filtro.productos : paginaBaseCacheada?.productos || productos;
  const totalPaginasAMostrar = hayFiltros ? paginaFiltroCacheada?.totalPaginas || filtro.totalPaginas : paginaBaseCacheada?.totalPaginas || totalPaginas;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrecioMinDebounced(precioMin);
      setPrecioMaxDebounced(precioMax);
    }, 400);
    return () => clearTimeout(timer);
  }, [precioMin, precioMax]);

  useEffect(() => {
    if (!hayFiltros && !paginaBaseCacheada) dispatch(fetchProductos({ page: pagina, size: PAGE_SIZE }));
  }, [dispatch, hayFiltros, pagina, paginaBaseCacheada]);

  useEffect(() => {
    if (hayFiltros && !paginaFiltroCacheada) dispatch(fetchProductosFiltrados(paramsFiltro));
  }, [dispatch, hayFiltros, paginaFiltroCacheada, paramsFiltro]);

  useEffect(() => {
    if (filtro.error) addToast({ title: "Error", description: filtro.error, color: "danger" });
  }, [filtro.error]);

  function actualizarUrl({ cats = categorias, sels = selecciones, pag = pagina + 1 } = {}) {
    const params = new URLSearchParams();
    if (pag > 1) params.set("pagina", pag);
    cats.forEach((categoria) => params.append("categoria", categoria));
    sels.forEach((seleccion) => params.append("seleccion", seleccion));
    navigate(`?${params.toString()}`, { replace: true });
  }

  function cambiarPagina(nuevaPagina) {
    setPagina(nuevaPagina - 1);
    actualizarUrl({ pag: nuevaPagina });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return { busqueda, cargando, categorias, cambiarPagina, pagina, precioMax, precioMin, productosAMostrar, selecciones, setBusqueda, setCategorias, setPagina, setPrecioMax, setPrecioMin, setSelecciones, totalPaginasAMostrar, actualizarUrl };
};
