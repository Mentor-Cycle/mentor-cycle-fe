import CardNotification from "@components/CardNotification/CardNotification";

import imgPerfil from "../../../public/imgCard.png";
import { useUser } from "@hooks/useUser";

const ModalNotifications = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col px-12 gap-12">
      <h1 className=" self-start text-secondary-02 text-2xl font-bold">
        Notificações
      </h1>
      <div className="flex flex-col gap-8 ">
        {/* <span className="self-start text-secondary-02 text-2xl font-bold">
          Hoje
        </span> */}
        <CardNotification
          description="Complete seu perfil!"
          name={user.firstName}
          imgUrl="/logoSvg.svg"
          alreadyViewed
        />
      </div>
      {/* <div className="flex flex-col gap-8 ">
        <span className="self-start text-secondary-02 text-2xl font-bold">
          Esta semana
        </span>
        <span>
          <CardNotification
            description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet"
            name="Gabriel Shiota"
            imgUrl={imgPerfil.src}
          />
        </span>
        <CardNotification
          description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet"
          name="Gabriel Shiota"
          imgUrl={imgPerfil.src}
          alreadyViewed
        />
        <CardNotification
          description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet"
          name="Gabriel Shiota"
          imgUrl={imgPerfil.src}
          alreadyViewed
        />
        <CardNotification
          description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet"
          name="Gabriel Shiota"
          imgUrl={imgPerfil.src}
          alreadyViewed
        />
      </div> */}
    </div>
  );
};

export default ModalNotifications;
