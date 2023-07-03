import { OptionStatus } from "schemas/create_event_output";

export const eventStatusToPortugueseMap: Record<OptionStatus, string> = {
  PENDING: "Agendada",
  DONE: "Realizada",
  CANCELLED: "Cancelada",
  CONFIRMED: "Agendada",
};
