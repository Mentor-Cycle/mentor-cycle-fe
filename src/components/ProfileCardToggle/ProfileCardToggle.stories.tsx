import { useState } from "react";
import AccountOutline from "mdi-react/AccountOutlineIcon";
import Menu from "mdi-react/MenuIcon";

import { ProfileCard } from "./ProfileCardToggle";
import { ProfileProps } from "./types";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Components/ProfileCardToggle",
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
        title="Quero ajudar como mentor"
        description="Nessa opção você entrará como mentor e somará na trajetória dos mentorados que entrarão na plataforma"
        Icon={
          <Menu
            size={64}
            className={isMentor ? "text-primary-03" : "text-gray-02"}
          />
        }
      />
    </div>
  );
};
