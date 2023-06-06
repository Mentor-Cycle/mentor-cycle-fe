import { useUser } from "@hooks/useUser";
import Link from "next/link";
import NavbarLP from "./NavbarLP";
import Image from "next/image";

export const HEIGHT_HEADER = 84;

const HeaderLP = () => {
  const { user } = useUser();

  const userIsLogged = user.isLogged ? "/dashboard" : "/signin";

  return (
    <header
      className={`min-h-[${HEIGHT_HEADER}px] bg-secondary-05 fixed w-full z-30 border-b border-gray-02`}
    >
      <div className="container flex justify-between py-4">
        <div className="w-1/5 h-full hidden md:flex justify-start items-center">
          <Link href={userIsLogged}>
            <Image
              alt="Logo"
              src={"/logoDarkMode.png"}
              width={55}
              height={55}
            />
          </Link>
        </div>
        <NavbarLP />
      </div>
    </header>
  );
};

export default HeaderLP;
