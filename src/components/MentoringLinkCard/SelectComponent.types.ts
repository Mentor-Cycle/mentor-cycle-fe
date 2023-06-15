import { Dispatch, SetStateAction } from "react";
import { Props as MentoringLinkCardProps } from "./MentoringLinkCard.types";
import { OptionStatus } from "schemas/create_event_output";
import { Pretify } from "types/helpers";

export type Props = Pretify<
  Pick<
    MentoringLinkCardProps,
    "eventId" | "status" | "onCancel" | "name" | "hour" | "date"
  > & {
    disabled?: boolean;
    setStatus: Dispatch<SetStateAction<OptionStatus>>;
  }
>;

export type IUpdateEventInput = {
  id: Props["eventId"];
  status: Props["status"];
};
