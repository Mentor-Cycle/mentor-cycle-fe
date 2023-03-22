import Image from "next/image";
import { MdMenu, MdEmail, MdNotifications } from "react-icons/md";
import logo from "../../public/logoSvg.svg";
import Link from "next/link";
import clsx from "clsx";
import userImage from "../../public/user.jpg";
import { HeaderProps } from "./Header.types";

const linkStyle = "flex space-x-3 items-center justify-center";

export default function Header({ isLogged, userName, photoUrl }: HeaderProps) {
  return (
    <div className="flex w-full h-20 bg-neutral-01 border-gray-02 border-b">
      <div className="flex justify-start w-2/5 h-full">
        <Link className={linkStyle} href="/home">
          <Image
            src={logo}
            width={64}
            height={56}
            alt="MentorCycle logo"
            className="py-3 ml-40"
          />
        </Link>
      </div>
      {isLogged && (
        <div className="w-3/5 h-full flex flex-row justify-end gap-11">
          <Link className={linkStyle} href="/home">
            <MdMenu size={24} />
            <span className="text-base">Home</span>
          </Link>
          <Link className={linkStyle} href="">
            <MdEmail size={24} />
            <span className="text-base">Mensagens</span>
          </Link>
          <Link className={linkStyle} href="">
            <MdNotifications size={24} />
            <span className="text-base">Notificações</span>
          </Link>
          <Link className={clsx(linkStyle, "mr-36")} href="/login">
            <div className="border border-secundary-01 w-9 h-9 rounded-full overflow-hidden">
              <Image
                src={photoUrl || userImage}
                width={100}
                height={100}
                alt="userPhoto"
                className="object-cover"
              />
            </div>
            <span className="text-base font-bold">{userName}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
