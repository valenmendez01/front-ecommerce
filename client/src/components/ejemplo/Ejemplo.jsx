import {Card, CardBody, CardFooter, Image} from "@heroui/react";
import fruit1 from "../../assets/fruit-1.jpeg";
import fruit2 from "../../assets/fruit-2.jpeg";
import fruit3 from "../../assets/fruit-3.jpeg";
import fruit4 from "../../assets/fruit-4.jpeg";

export default function App() {
  const list = [
    {
      title: "Orange",
      img: fruit1,
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: fruit2,
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: fruit3,
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: fruit4,
      price: "$5.30",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
      {list.map((item, index) => (
        /* eslint-disable no-console */
        <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
