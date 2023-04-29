import MentoringWeekCard from "@components/MentoringWeekCard";
import Chip from "@components/Chip/Chip";
import { formatHour } from "utils/dashboard-helpers";
import { ChipVariant } from "@components/Chip/Chip.types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Event {
  id: string;
  status: "PENDING" | "CANCELLED" | "DONE";
  startDate: string;
}

export const renderMentoringWeekCard = (eventsByDay: {
  [key: string]: { events: Event[] };
}) => {
  const statusDisplay: Record<
    "PENDING" | "CANCELLED" | "DONE",
    { label: string; variant: ChipVariant }
  > = {
    PENDING: { label: "A Confirmar", variant: "primary" },
    CANCELLED: { label: "Cancelada", variant: "quartenary" },
    DONE: { label: "Realizada", variant: "quartenary" },
  };

  return Object.entries(eventsByDay).map(
    ([date, events]: [string, { events: Event[] }], index: number) => {
      // const day = new Date(date).toLocaleString("pt-BR", { weekday: "long", timeZone: 'America/Sao_Paulo' });
      const data = parseISO(date);
      const dayWeek = format(data, "EEEE", { locale: ptBR });
      // const key = `${dayWeek}_${Math.random().toString(16).substr(2, 8)}`;
      return (
        <MentoringWeekCard
          key={index}
          day={dayWeek}
          description={`Você tem ${events.events.length} mentoria(s) marcada(s) para o dia de hoje`}
          chips={events.events.map((event: Event) => (
            <>
              <Chip
                key={`variant_${event.id}+${index}`}
                variant={statusDisplay[event.status].variant}
              >
                {statusDisplay[event.status].label}
              </Chip>

              <Chip key={`hour_${event.id}+${index}`} variant="secondary">
                {formatHour(new Date(event.startDate))}
              </Chip>
            </>
          ))}
        />
      );
    }
  );
};
