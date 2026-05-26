import { Card, CardBody } from '@heroui/react'

const TarjetaFormularioAuth = ({ children, alto = 'min-h-[560px]' }) => (
  <Card className="border-0 bg-[#fffdf8] shadow-none" radius="none">
    <CardBody className={`flex ${alto} justify-center px-8 py-10 md:px-12`}>
      {children}
    </CardBody>
  </Card>
)

export default TarjetaFormularioAuth
