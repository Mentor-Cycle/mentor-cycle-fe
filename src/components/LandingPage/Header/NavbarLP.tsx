import MobileNavBar from "@components/NavBar/MobileNavBar";
import useOpenHeaderLP from "@hooks/useOpenHeaderLP";
import Link from "next/link";
import ModalHeaderLP from "../Modals/ModalHeaderLP";
import Button from "@components/Button";
import { BsFillHouseDoorFill } from "react-icons/bs";
import MenuItem from "./MenuItem";
import { scrollToSection } from "./scrollSection";

const NavbarLP = () => {
  const openHeaderModal = useOpenHeaderLP();

  const handleScrollPage = (section: string) => {
    openHeaderModal.onClose();
    scrollToSection(section);
  };

  const bodyModal = (
    <div>
      <MenuItem title="Início" onClick={() => handleScrollPage("inicio")} />
      <MenuItem
        title="Como Funciona"
        onClick={() => handleScrollPage("como-funciona")}
      />
      <MenuItem title="Mentores" onClick={() => handleScrollPage("mentores")} />
    </div>
  );

  return (
    <nav className="flex justify-between md:justify-end md:items-end w-full">
      <ul className="flex md:space-x-8 lg:space-x-16 items-center justify-center">
        <li className="hover:opacity-80 transition-all duration-300 hover:cursor-pointer text-neutral-01 text-sm sm:text-base hidden md:block">
          <button onClick={() => scrollToSection("inicio")}>Início</button>
        </li>
        <li className="hover:opacity-80 transition-all duration-300 hover:cursor-pointer text-neutral-01 text-sm sm:text-base hidden md:block">
          <button onClick={() => scrollToSection("como-funciona")}>
            Como Funciona
          </button>
        </li>
        <li className="hover:opacity-80 transition-all duration-300 hover:cursor-pointer text-neutral-01 text-sm sm:text-base hidden md:block">
          <button onClick={() => scrollToSection("mentores")}>Mentores</button>
        </li>
        <li className="flex items-center justify-center w-[80px] lg:w-auto md:hidden">
          <button onClick={() => scrollToSection("inicio")}>
            <BsFillHouseDoorFill size={24} className="text-neutral-01" />
          </button>
        </li>
        <li className="min-w-[200px] hidden md:block">
          <Link href={"/signin"} className="focus:outline-none" tabIndex={1}>
            <Button size="small">Entrar</Button>
          </Link>
        </li>
      </ul>
      <div className="md:hidden">
        <button onClick={openHeaderModal.onOpen}>
          <MobileNavBar isOpen={openHeaderModal.isOpen} headerLp={true} />
        </button>
        <ModalHeaderLP
          isOpen={openHeaderModal.isOpen}
          onClose={openHeaderModal.onClose}
          body={bodyModal}
        />
      </div>
    </nav>
  );
};

export default NavbarLP;
