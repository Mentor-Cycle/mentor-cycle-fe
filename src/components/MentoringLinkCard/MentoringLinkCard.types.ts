export type Props = {
  avatar?: string;
  name: string;
  id?: string;
  job: string;
  date: any;
  hour: any;
  status: string;
  meetingLink?: string;
  eventId: string;
  onCancel: () => void;
};

export type StatusToVariantMap = {
  [key: string]:
    | "primary"
    | "secondary"
    | "tertiary"
    | "chipCards"
    | "quartenary";
};
