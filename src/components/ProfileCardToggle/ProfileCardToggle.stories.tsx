import { useState } from "react";
import { MdPermIdentity, MdMenu } from "react-icons/md";

import { ProfileCard } from "./ProfileCardToggle";
import { ProfileProps } from "./ProfileCardToggle.types";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Data Display/ProfileCardToggle",
  component: ProfileCard,
} as Meta;

const Template: Story<ProfileProps> = (args) => <ProfileCard {...args} />;

export const Interactive = () => {
  const [isMentor, setIsMentor] = useState<boolean>(false);

  return (
    <div className="flex justify-center gap-4">
      <ProfileCard
        onClick={() => setIsMentor(false)}
        active={!isMentor}
        title="Quero ser um mentorado"
        description="Aqui você terá acesso à nossa plataforma de mentores, que irão te ajudar na sua carreira profissional"
        Icon={
          <MdPermIdentity
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
        title="Quero ajudar como mentor"
        description="Nessa opção você entrará como mentor e somará na trajetória dos mentorados que entrarão na plataforma"
        Icon={
          <MdMenu
            size={64}
            className={isMentor ? "text-primary-03" : "text-gray-02"}
          />
        }
      />
    </div>
  );
};
