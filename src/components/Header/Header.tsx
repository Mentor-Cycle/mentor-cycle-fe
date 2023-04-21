import { useLazyQuery, useQuery } from "@apollo/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "Providers/user/AppContext";
import { useContext, useEffect } from "react";
import { MdEmail, MdMenu, MdNotifications } from "react-icons/md";
import { GET_ME } from "services/apollo/querys";

const linkStyle = "flex items-center justify-center";
const itemsMenuStyle = "flex space-x-1.5 lg:space-x-2 xl:space-x-3";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const { isLogged, firstName, photoUrl } = user;
  const { data } = useQuery(GET_ME, {
    skip: isLogged,
  });

  useEffect(() => {
    if (data) {
      setUser({
        firstName: data.me.firstName,
        photoUrl: data.me.photoUrl,
        email: data.me.email,
        isMentor: data.me.isMentor,
        id: data.me.id,
        isLogged: true,
      });
    }
  }, [data, setUser]);

  return (
    <header className="flex justify-items-end w-full h-20 bg-neutral-01 border-gray-02 border-b m-auto">
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
        <ul className="w-4/5 h-full flex flex-row justify-end min-[695px]:justify-end min-[450px]:gap-11 gap-4 xl:gap-11">
          <li className={linkStyle}>
            <Link className={itemsMenuStyle} href="/home">
              <MdMenu size={24} />
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
            <Link
              className={clsx(itemsMenuStyle, "items-center")}
              href="/login"
            >
              <figure className="border border-secundary-01 w-9 h-9 rounded-full overflow-hidden">
                <Image
                  src={photoUrl || "/imgCard.png"}
                  width={100}
                  height={100}
                  alt="userPhoto"
                  className="object-cover"
                />
              </figure>
              <h1 className="hidden min-[850px]:inline-flex text-base font-bold">
                {firstName}
              </h1>
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
