import { useState } from "react";
import { Filtros } from "../components/catalogo/filtrosCatalogo/Filtros";
import fruit1 from "../assets/fruit-1.jpeg";
import fruit2 from "../assets/fruit-2.jpeg";
import fruit3 from "../assets/fruit-3.jpeg";
import fruit4 from "../assets/fruit-4.jpeg";
import fruit5 from "../assets/fruit-1.jpeg";
import fruit6 from "../assets/fruit-2.jpeg";
import { CardProductos } from "../components/catalogo/cardPorductos/CardProductos";
import { Card, CardBody, CardHeader, Divider, Input } from "@heroui/react";
import { Search } from "lucide-react";

const CATEGORIAS = ["Remeras", "Pantalones", "Calzado", "Accesorios"];

const PRODUCTOS = [
  { id: 1, nombre: "Remera básica",       categoria: "Remeras",    precio: 1500,  img: fruit1  },
  { id: 2, nombre: "Jean slim",           categoria: "Pantalones", precio: 8000,  img: fruit2  },
  { id: 3, nombre: "Zapatillas blancas",  categoria: "Calzado",    precio: 12000, img: fruit3  },
  { id: 4, nombre: "Cinturón de cuero",   categoria: "Accesorios", precio: 3000,  img: fruit4  },
  { id: 5, nombre: "Remera rayada",       categoria: "Remeras",    precio: 2000,  img: fruit5  },
  { id: 6, nombre: "Jogger gris",         categoria: "Pantalones", precio: 6000,  img: fruit6  },
];

export const Catalogo = () => {

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(20000);
  const [busqueda, setBusqueda] = useState("");

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

  const productosFiltrados = PRODUCTOS
    .filter((p) => categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(p.categoria))
    .filter((p) => p.precio >= precioMin && p.precio <= precioMax)
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="flex bg-[#f4f5f8] min-h-screen font-sans">
      
      <aside className="w-80 shrink-0 bg-white border-r border-gray-200 p-6 flex flex-col gap-8 sticky top-0 h-screen overflow-y-auto">
        <Filtros
          categorias={CATEGORIAS}
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
