import { useDispatch, useSelector } from "react-redux";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { fetchCategorias } from "../../../redux/catalogoSlice";
import { useEffect } from "react";

export const FiltroByCategoria = ({ seleccionadas, onCambiar }) => {
  
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.productos.categorias);

  useEffect(() => {
    if (categorias.length === 0) dispatch(fetchCategorias())
  }, [dispatch, categorias.length])

  const formatearTexto = (str) => {
    const textoSinGuiones = str.replace(/_/g, " ");
    return textoSinGuiones.charAt(0).toUpperCase() + textoSinGuiones.slice(1).toLowerCase();
  };

  return (
    <CheckboxGroup
      value={seleccionadas}
      onChange={onCambiar}
    >
      {categorias.map((cat) => (
        <Checkbox
          key={cat}
          value={cat}
          classNames={{
            wrapper: [
              "before:border-[var(--color-dorado-primary)]",
              "after:bg-[var(--color-dorado-primary)]",
              "group-data-[selected=true]:border-[var(--color-dorado-primary)]",
            ],
            icon: "text-white",
          }}
        >
          {formatearTexto(cat)}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};