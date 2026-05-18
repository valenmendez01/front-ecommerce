
import {Navbar, NavbarContent, NavbarItem, Button, Image, Divider, NavbarBrand} from "@heroui/react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoHorizontal.png";
import { LogOut, ShoppingCart } from "lucide-react";

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <Image src={logo} width={150} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link color="foreground" to="/">
            Home
          </Link>
        </NavbarItem>

        <Divider orientation="vertical" className="h-5 self-center opacity-50 mx-2" />

        <NavbarItem isActive={pathname.startsWith("/productos")}>
          <Link aria-current="page" to="/productos">
            Catálogo
          </Link>
        </NavbarItem>

        <Divider orientation="vertical" className="h-5 self-center opacity-50 mx-2" />

        <NavbarItem isActive={pathname.startsWith("/mi-cuenta")}>
          <Link color="foreground" to="/mi-cuenta">
            Mi cuenta
          </Link>
        </NavbarItem>

        <Divider orientation="vertical" className="h-5 self-center opacity-50 mx-2" />

        <NavbarItem isActive={pathname.startsWith("/panel-vendedor")}>
          <Link color="foreground" to="/panel-vendedor">
            Panel vendedor
          </Link>
        </NavbarItem>

      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} to="/carrito" variant="light" isIconOnly>
            <ShoppingCart size={20} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="light" isIconOnly onClick={() => console.log("logout")}>
            <LogOut size={20} />
          </Button>
        </NavbarItem>
      </NavbarContent>
          </Navbar>
  );
}
