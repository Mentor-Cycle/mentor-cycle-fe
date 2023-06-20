import { Dispatch, SetStateAction } from "react";

export type CardNotificationProps = {
  imgUrl: string;
  name: string;
  description: string;
  alreadyViewed?: boolean;
  link?: string;
  setShowModal?: Dispatch<SetStateAction<string | undefined>>;
};
