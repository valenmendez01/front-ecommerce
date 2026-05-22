import { Button, Card, CardBody } from '@heroui/react'
import { CheckCircle2 } from 'lucide-react'

const AccionesCrearProducto = ({ mensaje, onPublicar, publicando, tipoMensaje }) => (
  <>
    <Button
      className="w-full bg-green-primary py-8 text-2xl font-black italic text-white shadow-xl"
      isDisabled={publicando}
      isLoading={publicando}
      radius="sm"
      startContent={!publicando && <CheckCircle2 size={28} strokeWidth={2.5} />}
      onPress={onPublicar}
    >
      Publicar producto
    </Button>

    {mensaje && (
      <Card
        className={`border bg-white shadow-md ${
          tipoMensaje === 'error' ? 'border-red-100' : 'border-dorado-primary/40'
        }`}
        radius="sm"
      >
        <CardBody className={`text-sm font-bold ${tipoMensaje === 'error' ? 'text-red-700' : 'text-green-primary'}`}>
          {mensaje}
        </CardBody>
      </Card>
    )}
  </>
)

export default AccionesCrearProducto
