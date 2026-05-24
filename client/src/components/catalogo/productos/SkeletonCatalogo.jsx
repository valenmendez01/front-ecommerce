import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";

export const SkeletonCatalogo = ({ cantidad = 9 }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: cantidad }).map((_, i) => (
        <Card key={i} shadow="sm" className="w-60">
          <CardBody className="overflow-visible p-0">
            <Skeleton className="rounded-lg">
              <div className="w-60 h-80" />
            </Skeleton>
          </CardBody>
          <CardFooter className="flex flex-col items-start gap-2">
            <Skeleton className="rounded w-3/4 h-4" />
            <Skeleton className="rounded w-1/2 h-4" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};