import { parse, max, min, format } from "date-fns";

export type AvailabilitySlot = {
  weekDay: string;
  startHour: string;
  endHour: string;
};

export const saveAvailability = (
  selectedDay: string,
  selectedStart: string,
  selectedEnd: string,
  availability: AvailabilitySlot[],
  setAvailability: (availability: AvailabilitySlot[]) => void
) => {
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
