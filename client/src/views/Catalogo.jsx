import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Filtros } from "../components/catalogo/filtrosCatalogo/Filtros";
import { ListaProductos } from "../components/catalogo/productos/ListaProductos";
import { Divider } from "@heroui/react";
import { GooeyInput } from "../components/ui/gooey-input";
import { SkeletonCatalogo } from "../components/catalogo/productos/SkeletonCatalogo";
import { addToast } from "@heroui/react";
import { FlipWords } from "../components/ui/flip-words";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductos, fetchCategorias, fetchSelecciones } from "../redux/catalogoSlice";

function obtenerFiltrosDesdeUrl(search, nombreSingular, nombrePlural) {
  const parametros = new URLSearchParams(search);

  return [
    ...parametros.getAll(nombreSingular),
    ...parametros.getAll(nombrePlural),
  ];
}

export const Catalogo = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const { productos, totalPaginas, loading: cargando, error } = useSelector(state => state.productos);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(() =>
    obtenerFiltrosDesdeUrl(location.search, "categoria", "categorias")
  );
  const [seleccionesSeleccionadas, setSeleccionesSeleccionadas] = useState(() =>
    obtenerFiltrosDesdeUrl(location.search, "seleccion", "selecciones")
  );
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(300000);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(0);
  const PAGE_SIZE = 9;

  useEffect(() => { 
    dispatch(fetchCategorias()) 
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchSelecciones()) 
  }, [dispatch])

  useEffect(() => {
    // Encodea caracteres especiales (espacios, acentos, &, etc.)
    const params = new URLSearchParams()
    params.set("page", pagina)
    params.set("size", PAGE_SIZE)
    if (busqueda.trim())      params.set("nombre", busqueda.trim())
    if (precioMin > 0)        params.set("min", precioMin)
    if (precioMax <= 300000)  params.set("max", precioMax)
    // Ej: ?categorias=ALBUM&categorias=FIGURITA
    categoriasSeleccionadas.forEach(c => params.append("categorias", c))
    seleccionesSeleccionadas.forEach(s => params.append("selecciones", s))
    dispatch(fetchProductos(params.toString()))
  }, [dispatch, categoriasSeleccionadas, seleccionesSeleccionadas, precioMin, precioMax, busqueda, pagina]);

  useEffect(() => {
    if (error) {
      addToast({
        title: "Error",
        description: error,
        color: "danger",
      })
    }
  }, [error]);

  function handleCambioCategoria(categorias) {
    setPagina(0);
    setCategoriasSeleccionadas(categorias);
  }

  function handleCambioSeleccion(seleccion) {
    setPagina(0);
    setSeleccionesSeleccionadas(seleccion);
  }

  function handlePrecioChange(tipo, valor) {
    if (tipo === "min") setPrecioMin(valor);
    if (tipo === "max") setPrecioMax(valor);
  }

  return (
    <div className="flex flex-col font-sans max-w-7xl mx-auto w-full mt-8">
      <div className="flex items-center justify-between px-6 py-4">
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
        <aside className="w-90 shrink-0 p-6 sticky top-24 self-start">
          <Filtros
            //categorias={categorias}
            categoriasSeleccionadas={categoriasSeleccionadas}
            onCambiarCategoria={handleCambioCategoria}
            //selecciones={selecciones}
            seleccionesSeleccionadas={seleccionesSeleccionadas} 
            onCambiarSeleccion={handleCambioSeleccion}
            precioMin={precioMin}
            precioMax={precioMax}
            onPrecioChange={handlePrecioChange}
          />
        </aside>

        <main className="flex-1 p-6 md:p-8">
          <div className="px-6 py-4 mb-6">
            {cargando
              ? <SkeletonCatalogo cantidad={9} />
              : <ListaProductos
                  productos={productos}
                  pagina={pagina + 1}
                  totalPaginas={totalPaginas}
                  onCambioPagina={(p) => { setPagina(p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                />
            }
          </div>
        </main>
      </div>
    </div>
  );
};
