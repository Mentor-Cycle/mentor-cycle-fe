export interface CalendarProps {
  availableDays: string[];
  selectedDate?: Date;
  daySelected: string;
  setSelectedDate: (date: Date) => void;
  setDaySelected: (day: string) => void;
}
// availableDays: [string, string?, string?, string?, string?, string?, string?];
