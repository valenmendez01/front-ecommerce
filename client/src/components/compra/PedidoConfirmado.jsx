import { Button } from "@heroui/react";
import { PackageCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PedidoConfirmado({ alVolverInicio }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="text-center max-w-md mx-auto p-8 bg-green-primary rounded-2xl"
      >
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <PackageCheck size={36} className="text-green-primary" />
        </div>

        <h1 className="text-2xl font-black text-white mb-2">
          Pedido confirmado
        </h1>

        <p className="text-white/70 mb-6">
          Recibirás un email con los detalles de tu colección. Gracias por tu compra.
        </p>

        <Button
          onPress={alVolverInicio}
          className="px-6 py-3 bg-dorado-primary text-black font-bold rounded-xl"
        >
          Volver al inicio
        </Button>
      </motion.div>
    </div>
  );
}
