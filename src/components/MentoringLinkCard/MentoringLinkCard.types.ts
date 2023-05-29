export type Props = {
  avatar?: string;
  name: string;
  id?: string;
  job: string;
  date: any;
  hour: string;
  endHour: string;
  status: string;
  meetingLink?: string;
  eventId: string;
  mentorName: string;
  startDate: string;
  endDate: string;
  onCancel: () => void;
};

export type StatusToVariantMap = {
  [key: string]: "primary" | "secondary" | "tertiary" | "chipCards";
};
