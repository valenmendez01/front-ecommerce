import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import DetalleVenta from './DetalleVenta'

const ModalDetalleVenta = ({ onCerrar, venta }) => {
  if (!venta) return null

  return (
    <Modal
      classNames={{
        base: 'border border-dorado-primary/40 bg-[#fffdf8] text-green-primary',
        header: 'border-b border-dorado-primary/30',
        footer: 'border-t border-dorado-primary/30',
      }}
      isOpen={Boolean(venta)}
      scrollBehavior="inside"
      size="4xl"
      onOpenChange={(abierto) => {
        if (!abierto) onCerrar()
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <span className="text-xs font-black uppercase tracking-[0.28em] text-dorado-primary">
                Detalle de la venta
              </span>
              <span className="text-2xl font-black">Venta #{venta.idVentaTexto}</span>
            </ModalHeader>
            <ModalBody className="py-6">
              <DetalleVenta venta={venta} />
            </ModalBody>
            <ModalFooter>
              <Button className="bg-green-primary font-bold text-white" radius="sm" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalDetalleVenta
