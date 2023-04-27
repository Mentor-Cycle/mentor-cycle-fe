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

    if (!acc[event.startDate]) {
      acc[event.startDate] = {
        date: format(date, "'Dia' dd 'de' MMMM", { locale: ptBR }),
        events: [],
      };
    }
    acc[event.startDate].events.push(event);
    // Ordenar os eventos por horário
    acc[event.startDate].events.sort(
      (a: any, b: any) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    return acc;
  }, {});
};
