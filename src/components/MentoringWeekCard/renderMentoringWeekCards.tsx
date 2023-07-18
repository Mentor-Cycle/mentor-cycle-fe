import MentoringWeekCard from "@components/MentoringWeekCard";
import Chip from "@components/Chip/Chip";
import {
  convertWeekDayNameToNumber,
  formatHour,
} from "utils/dashboard-helpers";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IStatusDisplay } from "types/dashboard.types";
import { Events } from "@components/MentoringWeekCard/MentoringWeekCard.types";
import { OptionStatus } from "schemas/create_event_output";
import { TWeekday_Lowercase } from "config/constants";

export const renderMentoringWeekCard = (
  eventsByDay: Record<string, Events>
) => {
  const statusDisplay: Record<OptionStatus, IStatusDisplay> = {
    PENDING: { label: "Agendado", variant: "chipCards" },
    CANCELLED: { label: "Cancelada", variant: "chipCanceled" },
    DONE: { label: "Realizada", variant: "chipRealized" },
    CONFIRMED: { label: "Agendado", variant: "chipCards" },
  };

  return Object.entries(eventsByDay)
    .map(([date, events], index) => {
      const data = parseISO(date);
      const dayWeek = format(data, "EEEE", {
        locale: ptBR,
      }) as TWeekday_Lowercase;
      return (
        <MentoringWeekCard
          key={index + date}
          day={dayWeek}
          description={`Você tem ${
            events.events.length
          } mentoria(s) marcada(s) para o dia ${format(data, "dd/MM/yyyy")}`}
          chips={events.events.map((event) => (
            <div key={event.id} className="flex gap-1">
              <Chip
                key={`variant_${event.id}`}
                variant={statusDisplay[event.status].variant}
              >
                {statusDisplay[event.status].label}
              </Chip>

              <Chip key={`hour_${event.id}`} variant="secondary">
                {formatHour(new Date(event.startDate))}
              </Chip>
            </div>
          ))}
        />
      );
    })
    .sort((a, b) => {
      const weekDayA = convertWeekDayNameToNumber(
        a.props.day as TWeekday_Lowercase
      );
      const weekDayB = convertWeekDayNameToNumber(
        b.props.day as TWeekday_Lowercase
      );
      return weekDayA > weekDayB ? 1 : -1;
    })
    .slice(0, 6);
};
