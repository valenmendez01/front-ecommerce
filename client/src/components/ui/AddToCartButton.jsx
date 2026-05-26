import { useState, useRef } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AddToCartButton
 *
 * Props:
 *  - onAdd      {function}  — callback que se ejecuta al presionar (ej: lógica del carrito)
 *  - disabled   {boolean}   — deshabilita el botón (sin stock, etc.)
 *  - children   {ReactNode} — label del botón (default: "Agregar al carrito")
 *  - className  {string}    — clases extra para el contenedor
 */
export const AddToCartButton = ({
  onAdd,
  disabled = false,
  children = "Agregar al carrito",
  className = "",
}) => {
  const [state, setState] = useState("idle");
  const timerRef = useRef(null);

  function handleClick() {
    if (state === "added" || disabled) return;
    onAdd?.();
    setState("added");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setState("idle"), 2200);
  }

  const isAdded = state === "added";

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileHover={!disabled && !isAdded ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={[
        "relative flex items-center justify-center gap-2.5",
        "h-12 px-7 rounded-xl",
        "text-[15px] font-semibold text-white",
        "overflow-hidden select-none cursor-pointer",
        "transition-colors duration-200",
        isAdded
          ? "bg-green-primary/80"
          : disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-green-primary hover:bg-green-primary/90",
        className,
      ].join(" ")}
    >
      {/* Shimmer sweep al agregar */}
      <AnimatePresence>
        {isAdded && (
          <motion.span
            key="shimmer"
            initial={{ x: "-100%", opacity: 1 }}
            animate={{ x: "250%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 w-1/2 bg-white/15 skew-x-[-20deg]"
          />
        )}
      </AnimatePresence>

      {/* Icono animado */}
      <span className="relative w-[22px] h-[22px] flex-shrink-0">
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={isAdded
            ? { y: -14, opacity: 0, scale: 0.5 }
            : { y: 0, opacity: 1, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <ShoppingCart size={20} strokeWidth={2} />
        </motion.span>

        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={isAdded
            ? { scale: 1, opacity: 1 }
            : { scale: 0, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 380, damping: 18, delay: isAdded ? 0.08 : 0 }}
        >
          <Check size={20} strokeWidth={2.8} />
        </motion.span>
      </span>

      {/* Texto */}
      <span className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {isAdded ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="block"
            >
              ¡Agregado!
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="block"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
};