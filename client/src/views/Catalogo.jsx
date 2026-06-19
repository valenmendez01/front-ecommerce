import { addToast, Divider } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { AsistenteWidget } from "../components/asistenteFigullect/AsistenteWidget";
import { Filtros } from "../components/catalogo/filtrosCatalogo/Filtros";
import { ListaProductos } from "../components/catalogo/productos/ListaProductos";
import { SkeletonCatalogo } from "../components/catalogo/productos/SkeletonCatalogo";
import { FlipWords } from "../components/ui/flip-words";
import { GooeyInput } from "../components/ui/gooey-input";
import { fetchProductos, fetchProductosFiltrados } from "../redux/catalogoSlice";

const PAGE_SIZE = 9;
const PRECIO_MAXIMO = 300000;

function obtenerFiltrosDesdeUrl(search, nombreSingular, nombrePlural) {
  const parametros = new URLSearchParams(search);
  return [
    ...parametros.getAll(nombreSingular),
    ...parametros.getAll(nombrePlural),
  ];
}

function obtenerPaginaDesdeUrl(search) {
  const parametros = new URLSearchParams(search);
  const paginaUrl = Number(parametros.get("pagina"));
  return Number.isFinite(paginaUrl) && paginaUrl > 0 ? paginaUrl - 1 : 0;
}

function crearParamsCatalogo({
  busqueda,
  categoriasSeleccionadas,
  pagina,
  precioMax,
  precioMin,
  seleccionesSeleccionadas,
}) {
  const params = new URLSearchParams();
  params.set("page", pagina);
  params.set("size", PAGE_SIZE);
  if (busqueda.trim()) params.set("nombre", busqueda.trim());
  if (precioMin > 0) params.set("min", precioMin);
  if (precioMax < PRECIO_MAXIMO) params.set("max", precioMax);
  categoriasSeleccionadas.forEach((categoria) => params.append("categorias", categoria));
  seleccionesSeleccionadas.forEach((seleccion) => params.append("selecciones", seleccion));
  return params.toString();
}

export const Catalogo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    filtro,
    loading,
    productos,
    productosPorConsulta,
    totalPaginas,
  } = useSelector((state) => state.productos);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(() =>
    obtenerFiltrosDesdeUrl(location.search, "categoria", "categorias")
  );
  const [seleccionesSeleccionadas, setSeleccionesSeleccionadas] = useState(() =>
    obtenerFiltrosDesdeUrl(location.search, "seleccion", "selecciones")
  );
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(PRECIO_MAXIMO);
  const [precioMinDebounced, setPrecioMinDebounced] = useState(0);
  const [precioMaxDebounced, setPrecioMaxDebounced] = useState(PRECIO_MAXIMO);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(() => obtenerPaginaDesdeUrl(location.search));

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrecioMinDebounced(precioMin);
      setPrecioMaxDebounced(precioMax);
    }, 400);
    return () => clearTimeout(timer);
  }, [precioMin, precioMax]);

  const hayFiltros =
    categoriasSeleccionadas.length > 0 ||
    seleccionesSeleccionadas.length > 0 ||
    busqueda.trim() !== "" ||
    precioMinDebounced > 0 ||
    precioMaxDebounced < PRECIO_MAXIMO;

  const claveBase = `page=${pagina}&size=${PAGE_SIZE}`;
  const paramsFiltro = crearParamsCatalogo({
    busqueda,
    categoriasSeleccionadas,
    pagina,
    precioMax: precioMaxDebounced,
    precioMin: precioMinDebounced,
    seleccionesSeleccionadas,
  });
  const paginaBaseCacheada = productosPorConsulta[claveBase];
  const paginaFiltroCacheada = filtro.productosPorConsulta[paramsFiltro];
  const cargando = hayFiltros ? filtro.loading && !paginaFiltroCacheada : loading && !paginaBaseCacheada;
  const productosAMostrar = hayFiltros
    ? paginaFiltroCacheada?.productos || filtro.productos
    : paginaBaseCacheada?.productos || productos;
  const totalPaginasAMostrar = hayFiltros
    ? paginaFiltroCacheada?.totalPaginas || filtro.totalPaginas
    : paginaBaseCacheada?.totalPaginas || totalPaginas;

  useEffect(() => {
    if (!hayFiltros && !paginaBaseCacheada) {
      dispatch(fetchProductos({ page: pagina, size: PAGE_SIZE }));
    }
  }, [dispatch, hayFiltros, pagina, paginaBaseCacheada]);

  useEffect(() => {
    if (!hayFiltros || paginaFiltroCacheada) return;
    dispatch(fetchProductosFiltrados(paramsFiltro));
  }, [dispatch, hayFiltros, paginaFiltroCacheada, paramsFiltro]);

  useEffect(() => {
    if (filtro.error) {
      addToast({ title: "Error", description: filtro.error, color: "danger" });
    }
  }, [filtro.error]);

  function actualizarUrl({ cats, sels, pag } = {}) {
    const categorias = cats ?? categoriasSeleccionadas;
    const selecciones = sels ?? seleccionesSeleccionadas;
    const p = pag ?? pagina + 1;
    const params = new URLSearchParams();
    if (p > 1) params.set("pagina", p);
    categorias.forEach((categoria) => params.append("categoria", categoria));
    selecciones.forEach((seleccion) => params.append("seleccion", seleccion));
    navigate(`?${params.toString()}`, { replace: true });
  }

  function handleCambioCategoria(categorias) {
    setPagina(0);
    setCategoriasSeleccionadas(categorias);
    actualizarUrl({ cats: categorias, pag: 1 });
  }

  function handleCambioSeleccion(seleccion) {
    setPagina(0);
    setSeleccionesSeleccionadas(seleccion);
    actualizarUrl({ sels: seleccion, pag: 1 });
  }

  function handlePrecioChange(tipo, valor) {
    if (tipo === "min") setPrecioMin(valor);
    if (tipo === "max") setPrecioMax(valor);
  }

  function aplicarFiltrosDesdeAsistente({
    categorias = [],
    selecciones = [],
    nombre = "",
    precioMin: nuevoPrecioMin = null,
    precioMax: nuevoPrecioMax = null,
  }) {
    const nuevasCategorias = categorias.length > 0 ? categorias : [];
    const nuevasSelecciones = selecciones.length > 0 ? selecciones : [];

    setPagina(0);
    setCategoriasSeleccionadas(nuevasCategorias);
    setSeleccionesSeleccionadas(nuevasSelecciones);
    setBusqueda(nombre);

    if (nuevoPrecioMin !== null) setPrecioMin(nuevoPrecioMin);
    if (nuevoPrecioMax !== null) setPrecioMax(nuevoPrecioMax);

    actualizarUrl({ cats: nuevasCategorias, sels: nuevasSelecciones, pag: 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col font-sans max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-6 pb-4 pt-4">
        <h1 className="font-display uppercase text-5xl text-green-primary">
          Encontrá tu próxima<FlipWords words={["figurita", "joya", "estrella", "sorpresa"]} />
        </h1>
        <GooeyInput
          placeholder="Buscar..."
          value={busqueda}
          onValueChange={(val) => { setBusqueda(val); setPagina(0); }}
        />
      </div>

      <Divider orientation="horizontal" />

      <div className="flex">
        <aside className="w-90 shrink-0 px-6 pb-6 pt-1 sticky top-24 self-start">
          <Filtros
            categoriasSeleccionadas={categoriasSeleccionadas}
            onCambiarCategoria={handleCambioCategoria}
            seleccionesSeleccionadas={seleccionesSeleccionadas}
            onCambiarSeleccion={handleCambioSeleccion}
            precioMin={precioMin}
            precioMax={precioMax}
            onPrecioChange={handlePrecioChange}
          />
        </aside>

        <main className="flex-1 px-6 pb-6 pt-1 md:px-8 md:pb-8 md:pt-1">
          <div className="mt-6 px-6 pb-4 mb-6">
            {cargando ? (
              <SkeletonCatalogo cantidad={9} />
            ) : (
              <ListaProductos
                productos={productosAMostrar}
                pagina={pagina + 1}
                totalPaginas={totalPaginasAMostrar}
                onCambioPagina={(p) => {
                  setPagina(p - 1);
                  actualizarUrl({ pag: p });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </div>
        </main>
      </div>

      <AsistenteWidget
        filtrosActuales={{
          categorias: categoriasSeleccionadas,
          selecciones: seleccionesSeleccionadas,
          precioMin,
          precioMax,
          busqueda,
          pagina: pagina + 1,
        }}
        onAplicarFiltro={aplicarFiltrosDesdeAsistente}
      />
    </div>
  );
};
