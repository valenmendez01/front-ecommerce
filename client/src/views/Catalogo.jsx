import { useEffect, useState } from "react";
import { Filtros } from "../components/catalogo/filtrosCatalogo/Filtros";
import { CardProductos } from "../components/catalogo/CardProductos";
import { Card, CardBody, CardHeader, Divider, Input } from "@heroui/react";
import { Search } from "lucide-react";

export const Catalogo = () => {

  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(20000);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch('/categorias')
      .then((res) => res.json())
      .then((json) => {
        setCategorias(json.data);
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });
  }, []);

  useEffect(() => {
    fetch('/productos')
      .then((res) => res.json())
      .then((json) => {
        setProductos(Array.isArray(json.data.content) ? json.data.content : []);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  function handleCambioCategoria(categoria) {
    setCategoriasSeleccionadas((categoriasPrevias) => {

      if (categoriasPrevias.includes(categoria)) {
        return categoriasPrevias.filter(
          (categoriaActual) => categoriaActual !== categoria
        );
      }

      return [...categoriasPrevias, categoria];
    });
  }

  function handlePrecioChange(tipo, valor) {
    if (tipo === "min") setPrecioMin(valor);
    if (tipo === "max") setPrecioMax(valor);
  }

  const productosFiltrados = productos
    .filter((p) => categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(p.categoria))
    .filter((p) => p.precio >= precioMin && p.precio <= precioMax)
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="flex font-sans">
      
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

        <Card>

          <CardHeader className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#2d334a]">Catálogo</h1>
              <span className="text-gray-400 text-lg font-medium">({productosFiltrados.length})</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Input 
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                startContent={
                  <Search />
                }
              />
            </div>
          </CardHeader>

          <Divider orientation="horizontal" />

          <CardBody className="px-6 py-4 mb-6">
            <CardProductos productos={productosFiltrados} />
          </CardBody>

        </Card>
      </main>

    </div>
  );
}
