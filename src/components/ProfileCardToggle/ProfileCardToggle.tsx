import { useState } from "react";
import Image from "next/image";
import AccountOutline from "mdi-react/AccountOutlineIcon";
import Menu from "mdi-react/MenuIcon";

type ProfileProps = {
  Icon: React.ReactNode;
  title: string;
  active: boolean;
  description: string;
  onClick?: () => void;
};

const ProfileCard = ({
  active,
  title,
  description,
  Icon,
  onClick,
}: ProfileProps) => {
  return (
    <section
      onClick={onClick}
      className={`box-border flex flex-col justify-center gap-4 rounded-lg w-80 cursor-pointer transition duration-500 ease-in-out ${
        active
          ? "border-4 border-solid border-primary-03 p-7/2"
          : "border border-solid border-gray-02 p-8"
      }`}
    >
      {Icon}
      <div className="mt-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-05">{description}</p>
      </div>
    </section>
  );
};

export const ProfileCardToggle = () => {
  const [isMentor, setIsMentor] = useState<boolean>(false);
  return (
    <main className="flex justify-center gap-4">
      <ProfileCard
        onClick={() => setIsMentor(false)}
        active={!isMentor}
        title="Quero ser 
um mentorado"
        description="Aqui você terá acesso à
nossa plataforma de mentores,que irão te ajudar na sua
carreira profissional"
        Icon={
          <AccountOutline
            size={64}
            className={`${
              !isMentor ? "text-primary-03" : "text-gray-02"
            } transition duration-500 ease-in-out`}
          />
        }
      />
      <ProfileCard
        onClick={() => setIsMentor(true)}
        active={isMentor}
        title="Quero ajudar
        como mentor"
        description="Nessa opção você entrará
        como mentor e somará
        na trajetória dos mentorados
        que entrarão na plataforma"
        Icon={
          <Menu
            size={64}
            className={isMentor ? "text-primary-03" : "text-gray-02"}
          />
        }
      />
    </main>
  );
};
