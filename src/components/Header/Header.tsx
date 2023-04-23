import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { UserContext, initialValue } from "providers/user/AppContext";
import { useContext, useState } from "react";

import { BsFillHouseDoorFill, BsFillPeopleFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdNotifications } from "react-icons/md";

import Modal from "@components/Modal/Modal";
import NavBar from "@components/NavBar/NavBar";
import Toggle from "@components/Toggle/Toggle";

import { useMutation } from "@apollo/client";
import useLocalStorage from "@hooks/useLocalStorage";
import { LOGOUT_USER } from "services/apollo/mutations";
import ModalNotifications from "./ModalNotifications";
import ModalSettings from "./ModalSettings";

const linkStyle = "flex items-center justify-center";
const itemsMenuStyle =
  "flex gap-2 items-center justify-center hover:text-gray-04";

export default function Header() {
  const [storedUser] = useLocalStorage("user", null);
  const { user, setUser } = useContext(UserContext);
  if (!user.isLogged && !user.firstName && storedUser) {
    setUser(storedUser);
  }
  const router = useRouter();
  const [toggleMenuProfile, setToggleMenuProfile] = useState(false);
  const [showModal, setShowModal] = useState<string>();
  const [darkMode, setDarkMode] = useState(false);
  const { isLogged, firstName, lastName, photoUrl, isMentor, email, id } = user;
  const [signOutUser] = useMutation(LOGOUT_USER);

  const itemsMenu: Array<{
    text: React.ReactNode;
    action: keyof typeof menuClickActions;
  }> = [
    { text: "Editar Perfil", action: "editprofile" },
    { text: "Configurações", action: "settings" },
    {
      text: (
        <>
          Dark Mode
          <Toggle isToggle={darkMode} setIsToggle={setDarkMode} />
        </>
      ),
      action: "theme",
    },
    { text: "Trocar de perfil", action: "changeprofile" },
    { text: "Sair", action: "logout" },
  ];
  const menuClickActions = {
    editprofile: () => router.push("/edit-perfil"),
    settings: () => {
      setShowModal("settings");
      setToggleMenuProfile(false);
    },
    theme: () => setDarkMode(!darkMode),
    changeprofile: () => console.log("trocar de perfil"),
    logout: async () => {
      await signOutUser();
      setUser(initialValue);
      router.replace("/");
    },
  };

  return (
    <header className="flex justify-items-end w-full h-20 bg-neutral-01 border-gray-02 border-b m-auto  relative">
      <figure className="w-1/5 h-full">
        <Link href="/">
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
              <span className="hidden min-[770px]:inline-flex text-base">
                Home
              </span>
            </Link>
          </li>

          <li className={linkStyle}>
            <button
              className={itemsMenuStyle}
              onClick={() => {
                setShowModal("notifications");
                setToggleMenuProfile(false);
              }}
            >
              <MdNotifications size={24} />
              <span className="hidden min-[770px]:inline-flex text-base">
                Notificações
              </span>
            </button>
          </li>
          <li className={linkStyle}>
            <Link className={itemsMenuStyle} href="">
              <BsFillPeopleFill size={24} />
              <span className="hidden min-[770px]:inline-flex text-base">
                Mentores
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
                <div className="flex flex-col">
                  <h1 className="hidden min-[850px]:inline-flex text-base ">
                    {firstName}
                  </h1>
                  <span
                    className={clsx(
                      "hidden min-[850px]:inline-flex text-xs text-primary-04 ",
                      {
                        isMentor: "text-primary-03",
                      }
                    )}
                  >
                    {isMentor ? "Mentor" : "Mentorado"}
                  </span>
                </div>
                <button
                  onClick={() => setToggleMenuProfile(!toggleMenuProfile)}
                >
                  {toggleMenuProfile ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
              </div>
            </div>
          </li>
        </ul>
      )}
      {showModal === "notifications" && (
        <Modal open={true} onOpenChange={() => setShowModal("")}>
          {<ModalNotifications />}
        </Modal>
      )}
      {showModal === "settings" && (
        <Modal open={true} onOpenChange={() => setShowModal("")}>
          {
            <ModalSettings
              firstName={firstName}
              email={email}
              id={id}
              lastName={lastName}
            />
          }
        </Modal>
      )}
    </header>
  );
}
