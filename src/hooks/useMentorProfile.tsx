import { useQuery } from "@apollo/client";
import { DAYS_OF_THE_WEEK } from "config/constants";
import { format, parse } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";
import { GET_MENTOR_BY_ID } from "services/apollo/queries";

export const useMentorProfile = (id: string) => {
  const { data, loading, error, refetch, client } = useQuery(GET_MENTOR_BY_ID, {
    variables: { id },
  });

  const [mentor, setMentor] = useState<User>({} as User);

  useEffect(() => {
    if (data) {
      const { availability: apiAvailability, ...fetchedMentor } =
        data.findOneMentor as { availability: AvailabilityApi[] } & User;
      if (!apiAvailability) return;
      const groupedAvailability: Availability[] = [];
      (apiAvailability as AvailabilityApi[]).forEach(
        ({ weekDay, startHour }) => {
          const weekDayName = DAYS_OF_THE_WEEK[weekDay];
          const existentAvailability = groupedAvailability.find(
            (item) => item.weekDay === weekDayName
          );

          const parsedStartHour = parse(startHour, "H:m", new Date());
          const formattedStartHour = format(parsedStartHour, "HH'h'mm", {
            locale: ptBR,
          });
          if (existentAvailability) {
            return existentAvailability.slots.push(formattedStartHour);
          }
          groupedAvailability.push({
            weekDay: weekDayName,
            slots: [formattedStartHour],
          });
        }
      );
      setMentor({ ...fetchedMentor, availability: groupedAvailability });
    }
  }, [data]);

  return {
    mentor,
    loading,
    error,
    refetch,
    client,
  };
};

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  state?: string;
  skills?: string[];
  description?: string;
  linkedin?: string;
  availability?: Availability[];
  photoUrl?: string;
  jobTitle?: string;
  jobCompany?: string;
  biography?: string;
  email?: string;
  github?: string;
  yearsOfExperience?: any;
};

type AvailabilityApi = {
  weekDay: number;
  startHour: string;
};

export type Availability = {
  weekDay: string;
  slots: string[];
};
