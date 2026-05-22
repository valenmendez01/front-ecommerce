import { Card, CardBody, Skeleton } from '@heroui/react'

const TarjetaMetricaCargando = ({ indice }) => (
  <Card className="border border-dorado-primary/30 shadow-lg" key={indice} radius="sm">
    <CardBody className="flex min-h-32 flex-row items-center justify-between gap-4 px-6 py-5">
      <div className="w-full">
        <Skeleton className="h-3 w-32 rounded-md" />
        <Skeleton className="mt-3 h-9 w-16 rounded-md" />
        <Skeleton className="mt-2 h-4 w-40 rounded-md" />
      </div>
      <Skeleton className="h-12 w-12 shrink-0 rounded-md" />
    </CardBody>
  </Card>
)

const TarjetasMetricasCargando = () => (
  <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    {[1, 2, 3, 4].map((indice) => <TarjetaMetricaCargando indice={indice} key={indice} />)}
  </section>
)

export default TarjetasMetricasCargando
