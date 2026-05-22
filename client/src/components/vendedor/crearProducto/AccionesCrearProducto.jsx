import { Card, CardBody } from '@heroui/react'
import StatefulButton from '../../ui/stateful-button'

const AccionesCrearProducto = ({ mensaje, onPublicar, publicando, tipoMensaje }) => (
  <>
    <StatefulButton
      className="w-full rounded-md py-6 text-2xl font-black italic shadow-xl"
      disabled={publicando}
      onClick={onPublicar}
    >
      Publicar producto
    </StatefulButton>

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
