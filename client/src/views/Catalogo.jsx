import { Divider } from "@heroui/react";
import { AsistenteWidget } from "../components/asistenteFigullect/AsistenteWidget";
import { Filtros } from "../components/catalogo/filtrosCatalogo/Filtros";
import { ListaProductos } from "../components/catalogo/productos/ListaProductos";
import { SkeletonCatalogo } from "../components/catalogo/productos/SkeletonCatalogo";
import { FlipWords } from "../components/ui/flip-words";
import { GooeyInput } from "../components/ui/gooey-input";
import { useCatalogo } from "../lib/useCatalogo";

export const Catalogo = () => {
  const catalogo = useCatalogo();

  function cambiarCategorias(categorias) {
    catalogo.setPagina(0);
    catalogo.setCategorias(categorias);
    catalogo.actualizarUrl({ cats: categorias, pag: 1 });
  }

  function cambiarSelecciones(selecciones) {
    catalogo.setPagina(0);
    catalogo.setSelecciones(selecciones);
    catalogo.actualizarUrl({ sels: selecciones, pag: 1 });
  }

  function cambiarPrecio(tipo, valor) {
    if (tipo === "min") catalogo.setPrecioMin(valor);
    if (tipo === "max") catalogo.setPrecioMax(valor);
  }

  function aplicarFiltrosDesdeAsistente({ categorias = [], selecciones = [], nombre = "", precioMin = null, precioMax = null }) {
    catalogo.setPagina(0);
    catalogo.setCategorias(categorias);
    catalogo.setSelecciones(selecciones);
    catalogo.setBusqueda(nombre);
    if (precioMin !== null) catalogo.setPrecioMin(precioMin);
    if (precioMax !== null) catalogo.setPrecioMax(precioMax);
    catalogo.actualizarUrl({ cats: categorias, sels: selecciones, pag: 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col font-sans">
      <div className="flex items-center justify-between px-6 pb-4 pt-4">
        <h1 className="font-display text-5xl uppercase text-green-primary">
          Encontrá tu próxima<FlipWords words={["figurita", "joya", "estrella", "sorpresa"]} />
        </h1>
        <GooeyInput
          placeholder="Buscar..."
          value={catalogo.busqueda}
          onValueChange={(valor) => { catalogo.setBusqueda(valor); catalogo.setPagina(0); }}
        />
      </div>

      <Divider orientation="horizontal" />

      <div className="flex">
        <aside className="sticky top-24 w-90 shrink-0 self-start px-6 pb-6 pt-1">
          <Filtros
            categoriasSeleccionadas={catalogo.categorias}
            onCambiarCategoria={cambiarCategorias}
            seleccionesSeleccionadas={catalogo.selecciones}
            onCambiarSeleccion={cambiarSelecciones}
            precioMin={catalogo.precioMin}
            precioMax={catalogo.precioMax}
            onPrecioChange={cambiarPrecio}
          />
        </aside>

        <main className="flex-1 px-6 pb-6 pt-1 md:px-8 md:pb-8 md:pt-1">
          <div className="mb-6 mt-6 px-6 pb-4">
            {catalogo.cargando ? (
              <SkeletonCatalogo cantidad={9} />
            ) : (
              <ListaProductos
                productos={catalogo.productosAMostrar}
                pagina={catalogo.pagina + 1}
                totalPaginas={catalogo.totalPaginasAMostrar}
                onCambioPagina={catalogo.cambiarPagina}
              />
            )}
          </div>
        </main>
      </div>

      <AsistenteWidget
        filtrosActuales={{
          categorias: catalogo.categorias,
          selecciones: catalogo.selecciones,
          precioMin: catalogo.precioMin,
          precioMax: catalogo.precioMax,
          busqueda: catalogo.busqueda,
          pagina: catalogo.pagina + 1,
        }}
        onAplicarFiltro={aplicarFiltrosDesdeAsistente}
      />
    </div>
  );
};
