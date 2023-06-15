import { TWeekday_Lowercase } from "config/constants";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { TGET_EVENTS_queryDataSchema as IEvents } from "services/apollo/queries/queries-properties";
import { IGroupEventsByDay } from "types/dashboard.types";

export const formatDate = (date: any) => {
  return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const formatHour = (date: any) => {
  return format(new Date(date), "HH'h'mm", { locale: ptBR });
};

export const convertWeekDayNameToNumber = (day: TWeekday_Lowercase) => {
  const weekDays: Record<TWeekday_Lowercase, number> = {
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

export const groupEventsByDay = (events: IEvents[]): IGroupEventsByDay => {
  return events.reduce((eventsGroupedByDay, event) => {
    const date = new Date(event.startDate);

    const dateKey = format(date, "yyyy-MM-dd");

    if (!eventsGroupedByDay[dateKey]) {
      eventsGroupedByDay[dateKey] = {
        date: new Date(date).toLocaleString("pt-BR", {
          weekday: "long",
          timeZone: "America/Sao_Paulo",
        }),
        events: [],
      };
    }
    eventsGroupedByDay[dateKey].events.push(event);
    // Ordenar os eventos por horário
    eventsGroupedByDay[dateKey].events.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    return eventsGroupedByDay;
  }, {} as IGroupEventsByDay);
};

type EVENT_TEMP = {
  [day: string]: {
    date: string;
    events: {
      id: string;
      mentorId: string;
      meetingLink: string;
      participants: {
        user: {
          id: string;
          firstName: string;
          lastName: string;
          jobTitle: string | null;
          isMentor: boolean;
          photoUrl: string | null;
        }[];
      };
      startDate: string;
      endDate: string;
      status: string;
      active: boolean;
    }[];
  };
};

// Remove events that has same status and same startDate
export const filterByUniqueEvents = (dateAndEvents: EVENT_TEMP) => {
  const filteredEvents = Object.entries(dateAndEvents).map(
    (dateAndEventsUnit) => {
      // Extract events from dateAndEventsUnit
      const extractedEvents = dateAndEventsUnit[1].events;
      const filteredExtractedEvents = extractedEvents.filter(
        (event, index, self) => {
          return (
            self.findIndex(
              (selfEvent) => selfEvent.startDate === event.startDate
            ) === index
          );
        }
      );

      return {
        [dateAndEventsUnit[0]]: {
          ...dateAndEventsUnit[1],
          events: filteredExtractedEvents,
        },
      };
    }
  );

  let eventsResultObj: EVENT_TEMP = {};

  filteredEvents.forEach((filteredEvent) => {
    // Store the actual key name and value
    const objKey = Object.entries(filteredEvent)[0][0];
    const objValue = Object.entries(filteredEvent)[0][1];

    eventsResultObj[objKey] = objValue;
  });

  return eventsResultObj;
};
