import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { MdEmail, MdNotifications } from "react-icons/md";

import { HeaderProps } from "./Header.types";

import NavBar from "@components/NavBar";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const linkStyle = "flex items-center justify-center";
const itemsMenuStyle =
  "flex gap-2 items-center justify-center hover:text-gray-04";

export default function Header({ isLogged, userName, photoUrl }: HeaderProps) {
  const [toggleMenuProfile, setToggleMenuProfile] = useState(false);

  const router = useRouter();

  const itemsMenu: Array<{
    text: string;
    action: keyof typeof menuClickActions;
  }> = [
    { text: "Editar Perfil", action: "editprofile" },
    { text: "Configurações", action: "settings" },
    { text: "Dark Mode", action: "theme" },
    { text: "Trocar de perfil", action: "changeprofile" },
    { text: "Sair", action: "logout" },
  ];
  const menuClickActions = {
    editprofile: () => router.push("/edit-perfil"),
    settings: () => console.log("configuracoes"),
    theme: () => console.log("darkmode"),
    changeprofile: () => console.log("trocar de perfil"),
    logout: () => console.log("sair"),
  };
  return (
    <header className="flex justify-items-start w-full h-20 bg-neutral-01 border-gray-02 border-b relative ">
      <figure className="w-1/5 h-full">
        <Link href="/home">
          <Image
            src={"/logoSvg.svg"}
            width={64}
            height={56}
            alt="MentorCycle logo"
            className="py-3 ml-10 lg:ml-20 xl:ml-40"
          />
        </Link>
      </figure>
      {isLogged && (
        <ul className="w-4/5 h-full flex justify-end min-[695px]:justify-end min-[450px]:gap-11 gap-4 xl:gap-11">
          <li className={linkStyle}>
            <Link className={itemsMenuStyle} href="/home">
              <BsFillHouseDoorFill size={24} />
              <span className="hidden min-[695px]:inline-flex text-base">
                Home
              </span>
            </Link>
          </li>
          <li className={linkStyle}>
            <Link className={itemsMenuStyle} href="">
              <MdEmail size={24} />
              <span className="hidden min-[695px]:inline-flex text-base">
                Mensagens
              </span>
            </Link>
          </li>
          <li className={linkStyle}>
            <Link className={itemsMenuStyle} href="">
              <MdNotifications size={24} />
              <span className="hidden min-[695px]:inline-flex text-base">
                Notificações
              </span>
            </Link>
          </li>
          <li className={clsx(linkStyle, "mr-10 lg:mr-16 xl:mr-36")}>
            <div className={clsx(itemsMenuStyle, "items-center")}>
              {toggleMenuProfile && (
                <NavBar
                  itemsMenu={itemsMenu}
                  menuClickActions={menuClickActions}
                />
              )}
              <figure className="border border-secundary-01 w-9 h-9 rounded-full overflow-hidden">
                <Image
                  src={photoUrl || "/imgCard.png"}
                  width={100}
                  height={100}
                  alt="userPhoto"
                  className="object-cover"
                />
              </figure>
              <div className="flex gap-20 items-center ">
                <h1 className="hidden min-[850px]:inline-flex text-base font-bold">
                  {userName}
                </h1>
                <button
                  onClick={() => setToggleMenuProfile(!toggleMenuProfile)}
                >
                  {toggleMenuProfile ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
              </div>
              <button>TESTE</button>
            </div>
          </li>
        </ul>
      )}
    </header>
  );
}
