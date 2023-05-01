import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const formatDate = (date: any) => {
  return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const formatHour = (date: any) => {
  return format(new Date(date), "HH'h'mm", { locale: ptBR });
};

export const convertWeekDayNameToNumber = (day: string) => {
  const weekDays: Record<string, number> = {
    "segunda-feira": 1,
    "terça-feira": 2,
    "quarta-feira": 3,
    "quinta-feira": 4,
    "sexta-feira": 5,
    sábado: 6,
    domingo: 0,
  };

  return weekDays[day];
};

export const groupEventsByDay = (events: any[]) => {
  return events.reduce((acc, event) => {
    const date = new Date(event.startDate);

    const dateKey = format(date, "yyyy-MM-dd");

    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: new Date(date).toLocaleString("pt-BR", {
          weekday: "long",
          timeZone: "America/Sao_Paulo",
        }),
        events: [],
      };
    }
    acc[dateKey].events.push(event);
    // Ordenar os eventos por horário
    acc[dateKey].events.sort(
      (a: any, b: any) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    return acc;
  }, {});
};
