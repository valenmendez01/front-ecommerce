import { useEffect, useState } from "react";
import { Filtros } from "../components/catalogo/filtrosCatalogo/Filtros";
import { ListaProductos } from "../components/catalogo/productos/ListaProductos";
import { Divider } from "@heroui/react";
import { GooeyInput } from "../components/ui/gooey-input";
import { SkeletonCatalogo } from "../components/catalogo/productos/SkeletonCatalogo";
import { addToast } from "@heroui/react";
import { FlipWords } from "../components/ui/flip-words";

export const Catalogo = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [selecciones, setSelecciones] = useState([]);
  const [seleccionesSeleccionadas, setSeleccionesSeleccionadas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(100000);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const PAGE_SIZE = 9;
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/categorias")
      .then(res => res.json())
      .then(json => setCategorias(json.data))
      .catch(err => addToast({ 
        title: "Error al cargar categorías", 
        description: err.message, 
        color: "danger" 
      }));
  }, []);

  useEffect(() => {
    fetch("/selecciones")
      .then(res => res.json())
      .then(json => setSelecciones(json.data))
      .catch(err => addToast({ 
        title: "Error al cargar selecciones", 
        description: err.message, 
        color: "danger" 
      }));
  }, []);

  useEffect(() => {
    const buildUrl = () => {
      // Encodea caracteres especiales (espacios, acentos, &, etc.)
      const params = new URLSearchParams();
      params.set("page", pagina);
      params.set("size", PAGE_SIZE);

      if (busqueda.trim())        params.set("nombre", busqueda.trim());
      if (precioMin > 0)          params.set("min", precioMin);
      if (precioMax < 100000)     params.set("max", precioMax);

      // Ej: ?categorias=ALBUM&categorias=FIGURITA
      categoriasSeleccionadas.forEach(c => params.append("categorias", c));
      seleccionesSeleccionadas.forEach(s => params.append("selecciones", s));

      return `/productos/filtrar?${params.toString()}`;
    };

    fetch(buildUrl())
      .then(res => res.json())
      .then(json => {
        setProductos(json.data.content || []);
        setTotalPaginas(json.data.totalPages ?? 1);
        setCargando(false);
      })
      .catch(err => addToast({
        title: "Error al cargar productos",
        description: err.message || "Intentá de nuevo más tarde.",
        color: "danger",
      }));
  }, [categoriasSeleccionadas, seleccionesSeleccionadas, precioMin, precioMax, busqueda, pagina]);

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
            categorias={categorias}
            categoriasSeleccionadas={categoriasSeleccionadas}
            onCambiarCategoria={handleCambioCategoria}
            selecciones={selecciones}
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