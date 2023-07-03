import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { initialValue } from "providers/user/AppContext";
import { useEffect, useState } from "react";
import { BsFillHouseDoorFill, BsFillPeopleFill } from "react-icons/bs";
import NavBar from "@components/NavBar/NavBar";
import { useMutation } from "@apollo/client";
import { useUser } from "@hooks/useUser";
import { LOGOUT_USER } from "services/apollo/mutations";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { removeTypenameProperty } from "utils/removeTypename";
import { MdNotifications } from "react-icons/md";
import { useModal } from "contexts/ModalContext";
import { ModalActionTypes } from "contexts/types";

const linkStyle = "flex items-center justify-center";
const itemsMenuStyle =
  "flex gap-2 items-center justify-center hover:text-gray-04 dark:hover:text-gray-01";

const DynamicThemedImage = dynamic(
  () => import("@components/Header/ThemeImage"),
  {
    ssr: false,
  }
);

export default function Header() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [toggleMenuProfile, setToggleMenuProfile] = useState(false);
  const [showModal, setShowModal] = useState<ModalActionTypes | "">();
  const { openModal } = useModal();

  const { error: errorMe } = useTypedQuery(api.GET_ME, {
    skip: user.isLogged,
    onCompleted(data) {
      const me = removeTypenameProperty(data.me);
      setUser({
        ...me,
        notifications: me.notifications ?? null,
        availability: me.availability?.map(removeTypenameProperty) ?? null,
        isLogged: true,
      });
    },
  });
  if (errorMe?.error) console.log("errorMe", errorMe);

  const [signOutUser] = useMutation(LOGOUT_USER);

  const { setTheme, resolvedTheme } = useTheme();
  const [isToggle, setIsToogle] = useState(true);
  const [itemsMenu] = useState({ text: "", action: "" });

  const menuOptions: Array<{
    text: string;
    action: keyof typeof menuClickActions;
  }> = [
    { text: "Editar Perfil", action: "editprofile" },
    { text: "Dark Mode", action: "darkmode" },
    { text: "Configurações", action: "settings" },
    { text: "Sair", action: "logout" },
  ];

  const logOutUser = () => async () => {
    await signOutUser();
    setUser(initialValue);
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };

  const menuClickActions = {
    editprofile: () => router.push("/profile"),
    darkmode: () => setDarkMode(),
    settings: () => {
      setShowModal(ModalActionTypes.SETTINGS_MODAL);
      setToggleMenuProfile(false);
    },
    logout: logOutUser(),
  };

  const handleValueChange = (value: string) => {
    const item = menuOptions.find((item) => item.action === value);
    if (item) {
      menuClickActions[item.action]();
    }
  };

  const { isLogged, firstName, photoUrl, isMentor } = user;

  const userIsLogged = isLogged ? "/dashboard" : "/signin";

  const setDarkMode = async () => {
    setIsToogle(!isToggle);
    const theme = resolvedTheme === "dark" ? "light" : "dark";
    try {
      setTheme(theme);
      setIsToogle(theme === "dark");
    } catch (error) {
      console.error("Error ao definir o tema:", error);
    }
  };

  useEffect(() => {
    if (showModal) openModal(showModal);
    setShowModal("");
  }, [showModal, openModal]);

  return (
    <header className="flex justify-center w-full h-20 bg-neutral-01 dark:bg-secondary-02 border-gray-02 border-b m-auto sticky top-0 z-30">
      <div className="flex justify-between items-center w-full container">
        <div className="w-1/5 h-full hidden sm:flex justify-start items-center">
          <Link href={userIsLogged}>
            <DynamicThemedImage />
          </Link>
        </div>
        {isLogged && (
          <ul className="flex justify-evenly sm:justify-end items-center w-full space-x-10">
            <li className={linkStyle}>
              <Link className={itemsMenuStyle} href="/dashboard">
                <BsFillHouseDoorFill size={24} />
                <span className="hidden lg:inline-block">Home</span>
              </Link>
            </li>
            <li className={linkStyle}>
              <Link className={itemsMenuStyle} href="/mentors">
                <BsFillPeopleFill size={24} />
                <span className="hidden lg:inline-block">Mentores</span>
              </Link>
            </li>
            <li className={linkStyle}>
              <button
                className={itemsMenuStyle}
                onClick={() => {
                  setShowModal(ModalActionTypes.NOTIFICATIONS_MODAL);
                  setToggleMenuProfile(false);
                }}
              >
                <MdNotifications size={24} />
                <span className="hidden lg:inline-block">Notificações</span>
              </button>
            </li>
            <li className={clsx(linkStyle)}>
              <div className="flex justify-center items-center">
                <figure className="rounded-full w-9 h-9 overflow-hidden mr-2 hidden sm:inline-block">
                  <Image
                    src={photoUrl || "/imgCard.png"}
                    width={100}
                    height={100}
                    alt="userPhoto"
                    className="object-cover"
                  />
                </figure>

                <div className="flex justify-center items-center">
                  <div className="flex flex-col justify-center items-start">
                    <h1 className="hidden sm:inline-block text-secondary-01 dark:text-neutral-02">
                      {firstName}
                    </h1>
                    <span
                      className={clsx(
                        "text-xs text-primary-04 dark:text-primary-02 hidden sm:inline-block",
                        {
                          isMentor: "text-primary-03",
                        }
                      )}
                    >
                      {isMentor ? "Mentor" : "Mentorado"}
                    </span>
                  </div>
                </div>
                <NavBar
                  isOpen={toggleMenuProfile}
                  setIsOpen={setToggleMenuProfile}
                  value={itemsMenu}
                  itemsMenu={menuOptions}
                  handleValueChange={handleValueChange}
                  isDark={resolvedTheme === "dark"}
                  setDarkMode={setDarkMode}
                  isToggle={isToggle}
                />
              </div>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
