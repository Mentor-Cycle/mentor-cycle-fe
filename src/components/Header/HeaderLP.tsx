import { useUser } from "@hooks/useUser";
import dynamic from "next/dynamic";
import Link from "next/link";
import NavbarLP from "./NavbarLP";

const HeaderLP = () => {
  const { user } = useUser();

  const DynamicThemedImage = dynamic(
    () => import("@components/Header/ThemeImage"),
    {
      ssr: false,
    }
  );

  const userIsLogged = user.isLogged ? "/dashboard" : "/";
  return (
    <header className="min-h-[84px] bg-neutral-01 dark:bg-secondary-05 fixed w-full z-30 border-b border-gray-02">
      <div className="container flex justify-between py-4">
        <div className="w-1/5 h-full hidden sm:flex justify-start items-center">
          <Link href={userIsLogged}>
            <DynamicThemedImage />
          </Link>
        </div>
        <NavbarLP />
      </div>
    </header>
  );
};

export default HeaderLP;
