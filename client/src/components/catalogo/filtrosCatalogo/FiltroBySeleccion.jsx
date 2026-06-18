import { useSelector, useDispatch } from "react-redux";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { useEffect } from "react";
import { fetchSelecciones } from "../../../redux/catalogoSlice";

export const FiltroBySeleccion = ({ seleccionadas, onCambiar }) => {

  const dispatch = useDispatch();
  const selecciones = useSelector(state => state.productos.selecciones);

  useEffect(() => {
    if (selecciones.length === 0) dispatch(fetchSelecciones())
  }, [dispatch, selecciones.length])

  const capitalizar = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="max-h-52 overflow-y-auto pr-1">
    <CheckboxGroup
      value={seleccionadas}
      onChange={onCambiar}
    >
      {selecciones.map((sel) => (
        <Checkbox
          key={sel}
          value={sel}
          classNames={{
            wrapper: [
              "before:border-[var(--color-dorado-primary)]",
              "after:bg-[var(--color-dorado-primary)]",
              "group-data-[selected=true]:border-[var(--color-dorado-primary)]",
            ],
            icon: "text-white",
          }}
        >
          {capitalizar(sel)}
        </Checkbox>
      ))}
    </CheckboxGroup>
    </div>
  );
};