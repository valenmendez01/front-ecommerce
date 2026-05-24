import { useEffect, useState } from "react";
import { Filtros } from "../components/catalogo/filtrosCatalogo/Filtros";
import { ListaProductos } from "../components/catalogo/productos/ListaProductos";
import { Divider } from "@heroui/react";
import { GooeyInput } from "../components/ui/gooey-input";
import { SkeletonCatalogo } from "../components/catalogo/productos/SkeletonCatalogo";
import { addToast } from "@heroui/react";

export const Catalogo = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(20000);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const PAGE_SIZE = 9;
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    fetch("/categorias")
      .then((res) => res.json())
      .then((json) => setCategorias(json.data))
      .catch(() =>
        addToast({
          title: "Error al cargar categorías",
          description: "No se pudieron obtener las categorías. Intentá de nuevo más tarde.",
          color: "danger",
        })
      );
  }, []);

  useEffect(() => {
    const buildUrl = () => {
      const pagination = `page=${pagina}&size=${PAGE_SIZE}`;

      if (busqueda.trim()) {
        return `/productos/filtrar/nombre?nombre=${encodeURIComponent(busqueda)}&${pagination}`;
      }
      if (categoriasSeleccionadas.length === 1) {
        return `/productos/filtrar/${categoriasSeleccionadas[0]}?${pagination}`;
      }
      if (precioMin > 0 || precioMax < 20000) {
        return `/productos/filtrar/precio?min=${precioMin}&max=${precioMax}&${pagination}`;
      }
      return `/productos?${pagination}`;
    };

    setTimeout(() => setCargando(true), 0);
    fetch(buildUrl())
      .then((res) => res.json())
      .then((json) => {
        setProductos(Array.isArray(json.data.content) ? json.data.content : []);
        setTotalPaginas(json.data.totalPages ?? 1);
      })
      .catch((error) =>
        addToast({
          title: "Error al cargar productos",
          description: error.message || "Intentá de nuevo más tarde.",
          color: "danger",
        })
      )
      .finally(() => setCargando(false));
  }, [categoriasSeleccionadas, precioMin, precioMax, busqueda, pagina]);

  function handleCambioCategoria(categoria) {
    setPagina(0);
    setCategoriasSeleccionadas((categoriasPrevias) =>
      categoriasPrevias.includes(categoria)
        ? categoriasPrevias.filter((c) => c !== categoria)
        : [...categoriasPrevias, categoria]
    );
  }

  function handlePrecioChange(tipo, valor) {
    if (tipo === "min") setPrecioMin(valor);
    if (tipo === "max") setPrecioMax(valor);
  }

  return (
    <div className="flex flex-col font-sans max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-6 py-4">
        <h1>Mostrando {productos.length} productos</h1>
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