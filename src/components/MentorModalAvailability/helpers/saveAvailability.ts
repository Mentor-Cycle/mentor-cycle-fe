import { AvailabilitySlot } from "@components/MentorModalAvailability/MentorModalAvailability.types";
import { TWeekday_Short } from "config/constants";
import { parse, max, min, format } from "date-fns";
import { Dispatch, SetStateAction } from "react";

export const saveAvailabilityInMemory = (
  selectedDay: TWeekday_Short,
  selectedStart: string,
  selectedEnd: string,
  availability: AvailabilitySlot[],
  setAvailability: Dispatch<SetStateAction<AvailabilitySlot[]>>
) => {
  if (selectedStart === selectedEnd) return;

  const isStartHourAfterEndHour =
    parse(selectedStart, "HH:mm", new Date()).getTime() >=
    parse(selectedEnd, "HH:mm", new Date()).getTime();

  if (isStartHourAfterEndHour) return;

  const newSlot = {
    weekDay: selectedDay,
    startHour: selectedStart,
    endHour: selectedEnd,
  };

  const isDayAlreadySelected = availability.some(
    (slot) => slot.weekDay === selectedDay
  );

  if (isDayAlreadySelected) {
    const newAvailability = availability.map((slot) => {
      if (slot.weekDay !== selectedDay) {
        return slot;
      }

      const newStartHour = parse(newSlot.startHour, "HH:mm", new Date());
      const newEndHour = parse(newSlot.endHour, "HH:mm", new Date());
      const existingStartHour = parse(slot.startHour, "HH:mm", new Date());
      const existingEndHour = parse(slot.endHour, "HH:mm", new Date());

      if (
        newStartHour >= existingStartHour &&
        newStartHour <= existingEndHour
      ) {
        const endTime = max([existingEndHour, newEndHour]);
        const startTime = min([existingStartHour, newStartHour]);
        return {
          ...slot,
          startHour: format(startTime, "HH:mm"),
          endHour: format(endTime, "HH:mm"),
        };
      } else if (
        newEndHour >= existingStartHour &&
        newEndHour <= existingEndHour
      ) {
        const startTime = min([existingStartHour, newStartHour]);
        const endTime = max([existingEndHour, newEndHour]);
        return {
          ...slot,
          startHour: format(startTime, "HH:mm"),
          endHour: format(endTime, "HH:mm"),
        };
      } else {
        return slot;
      }
    });
    setAvailability(newAvailability);
  } else {
    setAvailability([...availability, newSlot]);
  }
};
