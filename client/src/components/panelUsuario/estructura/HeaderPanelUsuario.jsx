import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../../assets/logoHorizontal.png";

export default function HeaderPanelUsuario({ accion, textoAccion }) {
  return (
    <header className="sticky top-0 z-20 border-b border-dorado-primary/25 bg-green-primary shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <motion.img
          src={logo}
          alt="FIGULLECT"
          className="h-10 w-auto"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        />

        <Button
          variant="light"
          startContent={<ArrowLeft size={16} />}
          onPress={accion}
          className="text-sm font-semibold text-white/85 hover:text-white"
        >
          {textoAccion}
        </Button>
      </div>
    </header>
  );
}
