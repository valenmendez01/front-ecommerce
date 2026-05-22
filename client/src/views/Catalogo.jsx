import { useEffect, useState } from "react";
import { Filtros } from "../components/catalogo/filtrosCatalogo/Filtros";
import { ListaProductos } from "../components/catalogo/productos/ListaProductos";
import { Divider } from "@heroui/react";
import { GooeyInput } from "../components/ui/gooey-input";

export const Catalogo = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(20000);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("/categorias")
      .then((res) => res.json())
      .then((json) => setCategorias(json.data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  useEffect(() => {
    fetch("/productos")
      .then((res) => res.json())
      .then((json) =>
        setProductos(Array.isArray(json.data.content) ? json.data.content : [])
      )
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  function handleCambioCategoria(categoria) {
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

  const productosFiltrados = productos
    .filter(
      (p) =>
        categoriasSeleccionadas.length === 0 ||
        categoriasSeleccionadas.includes(p.categoria)
    )
    .filter((p) => p.precio >= precioMin && p.precio <= precioMax)
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="flex flex-col font-sans max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-6 py-4">
        <h1>Mostrando {productosFiltrados.length} productos</h1>
        <GooeyInput
          placeholder="Buscar..."
          value={busqueda}
          onValueChange={(val) => setBusqueda(val)}
        />
      </div>

      <Divider orientation="horizontal" />

      <div className="flex">
        <aside className="w-90 shrink-0 p-6 sticky top-16 self-start">
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
            <ListaProductos productos={productosFiltrados} />
          </div>
        </main>
      </div>
    </div>
  );
};