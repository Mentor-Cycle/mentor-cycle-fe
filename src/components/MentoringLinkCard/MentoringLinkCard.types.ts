import { OptionStatus } from "schemas/create_event_output";
import { ChipVariant } from "@components/Chip/Chip.types";

export type Props = {
  avatarUrl?: string | null;
  name: string;
  id?: string;
  job: string;
  date: string;
  hour: string;
  status: OptionStatus;
  meetingLink?: string;
  eventId: string;
  onCancel: (...args: any[]) => void;
};

// export type StatusToVariantMapX = {
//   [key: string]: "primary" | "secondary" | "tertiary" | "chipCards";
// };

export type StatusToVariantMap = Record<
  string,
  Extract<
    ChipVariant,
    | "primary"
    | "secondary"
    | "tertiary"
    | "chipCards"
    | "chipCanceled"
    | "chipRealized"
  >
>;
