import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Filtros } from "../components/catalogo/filtrosCatalogo/Filtros";
import { ListaProductos } from "../components/catalogo/productos/ListaProductos";
import { Divider } from "@heroui/react";
import { GooeyInput } from "../components/ui/gooey-input";
import { SkeletonCatalogo } from "../components/catalogo/productos/SkeletonCatalogo";
import { addToast } from "@heroui/react";
import { FlipWords } from "../components/ui/flip-words";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductosFiltrados, fetchProductos } from "../redux/catalogoSlice";
import { AsistenteWidget } from "../components/asistenteFigullect/AsistenteWidget";

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

export const Catalogo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    productos,
    totalPaginas,
    loading,
    filtro: { 
      productos: filtrados, 
      totalPaginas: totalPaginasFiltrados, 
      loading: loadingFiltro, 
      error,
      lastParams,
    }
  } = useSelector(state => state.productos);

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(() =>
    obtenerFiltrosDesdeUrl(location.search, "categoria", "categorias")
  );
  const [seleccionesSeleccionadas, setSeleccionesSeleccionadas] = useState(() =>
    obtenerFiltrosDesdeUrl(location.search, "seleccion", "selecciones")
  );

  // Precio: estado visual (slider) vs estado debounced (fetch)
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(300000);
  const [precioMinDebounced, setPrecioMinDebounced] = useState(0);
  const [precioMaxDebounced, setPrecioMaxDebounced] = useState(300000);

  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(() => obtenerPaginaDesdeUrl(location.search));
  const PAGE_SIZE = 9;

  // Debounce de precio: espera 400ms tras el último movimiento para actualizar
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrecioMinDebounced(precioMin);
      setPrecioMaxDebounced(precioMax);
    }, 400);
    return () => clearTimeout(timer);
  }, [precioMin, precioMax]);

  // hayFiltros usa los valores debounced para no activarse en cada arrastre
  const hayFiltros = 
    categoriasSeleccionadas.length > 0 ||
    seleccionesSeleccionadas.length > 0 ||
    busqueda.trim() !== "" ||
    precioMinDebounced > 0 ||
    precioMaxDebounced < 300000;

  const cargando = hayFiltros ? loadingFiltro : loading;
  const productosAMostrar = hayFiltros ? filtrados : productos;
  const totalPaginasAMostrar = hayFiltros ? totalPaginasFiltrados : totalPaginas;

  // Carga inicial: solo si el store está vacío
  useEffect(() => {
    if (productos.length === 0) {
      dispatch(fetchProductos({ page: 0, size: PAGE_SIZE }));
    }
  }, [dispatch, productos.length]);

  // Solo cuando hay filtros activos — usa valores debounced de precio
  useEffect(() => {
    if (!hayFiltros) return;

    const params = new URLSearchParams();
    params.set("page", pagina);
    params.set("size", PAGE_SIZE);
    if (busqueda.trim())             params.set("nombre", busqueda.trim());
    if (precioMinDebounced > 0)      params.set("min", precioMinDebounced);
    if (precioMaxDebounced < 300000) params.set("max", precioMaxDebounced);
    categoriasSeleccionadas.forEach(c => params.append("categorias", c));
    seleccionesSeleccionadas.forEach(s => params.append("selecciones", s));

    const paramsStr = params.toString();

    if (paramsStr === lastParams) return;

    dispatch(fetchProductosFiltrados(paramsStr));
  }, [
    dispatch,
    categoriasSeleccionadas,
    seleccionesSeleccionadas,
    precioMinDebounced,   // ← debounced, no el directo
    precioMaxDebounced,   // ← debounced, no el directo
    busqueda,
    pagina,
    hayFiltros,
    lastParams,
  ]);

  useEffect(() => {
    if (error) {
      addToast({ title: "Error", description: error, color: "danger" });
    }
  }, [error]);

  function actualizarUrl({ cats, sels, pag } = {}) {
    const categorias = cats ?? categoriasSeleccionadas;
    const selecciones = sels ?? seleccionesSeleccionadas;
    const p = pag ?? pagina + 1;

    const params = new URLSearchParams();
    if (p > 1) params.set("pagina", p);
    categorias.forEach(c => params.append("categoria", c));
    selecciones.forEach(s => params.append("seleccion", s));

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
    // Solo actualiza el estado visual; el debounce se encarga del fetch
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
            {cargando
              ? <SkeletonCatalogo cantidad={9} />
              : <ListaProductos
                  productos={productosAMostrar}
                  pagina={pagina + 1}
                  totalPaginas={totalPaginasAMostrar}
                  onCambioPagina={(p) => {
                    setPagina(p - 1);
                    actualizarUrl({ pag: p });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
            }
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