import Button from "@components/Button";
import Link from "next/link";
import React from "react";

const NavbarLP = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav>
      <ul className="flex space-x-16 items-center justify-center">
        <li className="hover:opacity-80 transition-all duration-300 hover:cursor-pointer">
          <button onClick={() => scrollToSection("inicio")}>Início</button>
        </li>
        <li className="hover:opacity-80 transition-all duration-300 hover:cursor-pointer">
          <button onClick={() => scrollToSection("como-funciona")}>
            Como Funciona
          </button>
        </li>
        <li className="hover:opacity-80 transition-all duration-300 hover:cursor-pointer">
          <button onClick={() => scrollToSection("mentores")}>Mentores</button>
        </li>
        <li className="min-w-[200px]">
          <Link href={"/"}>
            <Button size="small">Registrar</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarLP;
