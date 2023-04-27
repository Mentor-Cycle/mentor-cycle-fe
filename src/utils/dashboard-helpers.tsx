import Chip from "@components/Chip";
import MentoringWeekCard from "@components/MentoringWeekCard";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const formatDate = (date: any) => {
  return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const formatHour = (date: any) => {
  return format(new Date(date), "HH'h'mm", { locale: ptBR });
};

export const groupEventsByDay = (events: any[]) => {
  return events.reduce((acc, event) => {
    const date = new Date(event.startDate);
    const day = format(date, "yyyy-MM-dd");
    if (!acc[day]) {
      acc[day] = {
        date: format(date, "'Dia' dd 'de' MMMM", { locale: ptBR }),
        events: [],
      };
    }
    acc[day].events.push(event);
    // Ordenar os eventos por horário
    acc[day].events.sort(
      (a: any, b: any) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    return acc;
  }, {});
};
