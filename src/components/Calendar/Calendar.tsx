import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ClassNames, DayPicker } from "react-day-picker";
import { CalendarProps } from "./Calendar.types";
import { pt } from "date-fns/locale";

function Calendar({ availableDays }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [daySelect, setDaySelect] = useState<string>("");

  function formatDate(date: Date): string {
    return format(date, "dd/MM/yyyy");
  }

  function isDayDisabled(day: Date) {
    const today = new Date();
    if (day < today) {
      return true;
    }
    const formattedDay = formatDate(day);
    return !availableDays.includes(formattedDay);
  }

  function changeDayClick(day: Date) {
    const formatted = formatDate(day);
    setDaySelect(formatted);
    setSelectedDate(day);
  }

  useEffect(() => {}, [daySelect]);

  const classNames: ClassNames = {
    head_cell: "font-medium",
    day_disabled: "text-gray-01",
    day_selected: "bg-primary-02 text-neutral-01",
    caption: "text-lg font-bold pl-1 mb-12 text-left ml-1",
    day: "p-1.5 w-[35px] h-[35px] rounded-lg mx-1.5 my-1.5 font-medium",
  };

  return (
    <div className="flex flex-col">
      <DayPicker
        disableNavigation
        selected={selectedDate}
        onDayClick={changeDayClick}
        disabled={isDayDisabled}
        locale={pt}
        className="p-12 bg-neutral-02 rounded-lg w-[445px] h-[447px] border-gray-02 border text-center"
        classNames={classNames}
      />
    </div>
  );
}

export default Calendar;
