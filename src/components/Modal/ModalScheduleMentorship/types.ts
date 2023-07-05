import { TWeekday_Lowercase } from "config/constants";

type Availability = {
  active: boolean;
  weekDay: number;
  startHour: string;
  endHour: string;
  startDate: string;
  endDate: string;
};

export type MentorAvailability = {
  findMentorAvailability: {
    firstName: string;
    lastName: string;
    availability: Availability[];
  };
};

export type AvailabilitySlots = Record<
  string,
  { weekDay: TWeekday_Lowercase; slots: string[] }
>;
