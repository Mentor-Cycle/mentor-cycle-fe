import { useQuery } from "@apollo/client";
import { DAYS_OF_THE_WEEK } from "config/constants";
import { useEffect, useState } from "react";
import { GET_MENTOR_BY_ID } from "services/apollo/querys";

export const useMentorProfile = (id: string) => {
  const { data, loading, error } = useQuery(GET_MENTOR_BY_ID, {
    variables: { id },
  });

  const [mentor, setMentor] = useState<User>({});

  useEffect(() => {
    if (data) {
      const { availability: apiAvailability, ...fetchedMentor } =
        data.findOneMentor as { availability: AvailabilityApi[] } & User;

      const groupedAvailability: Availability[] = [];
      (apiAvailability as AvailabilityApi[]).forEach(
        ({ weekDay, startHour }) => {
          const weekDayName = DAYS_OF_THE_WEEK[weekDay];
          const existentAvailability = groupedAvailability.find(
            (item) => item.weekDay === weekDayName
          );

          if (existentAvailability) {
            return existentAvailability.slots.push(startHour);
          }

          groupedAvailability.push({
            weekDay: weekDayName,
            slots: [startHour],
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
  };
};

export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  state?: string;
  skills?: string[];
  description?: string;
  availability?: Availability[];
  photoUrl?: string;
  jobTitle?: string;
  jobCompany?: string;
  biography?: string;
  email?: string;
  website?: string;
  yearsOfExperience?: string;
};

type AvailabilityApi = {
  weekDay: number;
  startHour: string;
};

export type Availability = {
  weekDay: string;
  slots: string[];
};
