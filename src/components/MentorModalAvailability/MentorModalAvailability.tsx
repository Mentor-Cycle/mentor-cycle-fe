import Button from "@components/Button";
import Chip from "@components/Chip/Chip";
import Modal from "@components/Modal";
import TimeInput from "@components/TimeInput/TimeInput";
import { DAYS_OF_THE_WEEK_SHORT } from "config/constants";
import { useState } from "react";
import { AvailabilitySlot, saveAvailability } from "./helpers/saveAvailability";
import { MdClose } from "react-icons/md";

export const MentorModalAvailability = (props: { active: boolean }) => {
  const [selectedDay, setSelectedDay] = useState(DAYS_OF_THE_WEEK_SHORT[0]);
  const [selectedStart, setSelectedStart] = useState("12:00");
  const [selectedEnd, setSelectedEnd] = useState("12:30");
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);

  const handleSaveAvailability = () => {
    saveAvailability(
      selectedDay,
      selectedStart,
      selectedEnd,
      availability,
      setAvailability
    );
  };

  const handlePersistAvailability = () => {};

  const removeAvailability = (slot: AvailabilitySlot) => {
    const newAvailability = availability.filter(
      (item) => item.weekDay !== slot.weekDay
    );
    setAvailability(newAvailability);
  };

  return (
    <Modal open={props.active}>
      <section className="w-full px-6 text-left z-20">
        <h1 className="inline text-secondary-03 font-semibold text-2xl">
          Horário de mentoria
        </h1>
        <p>Defina seus horários e datas disponíveis</p>
        <section className="flex gap-6 mt-12 flex-wrap">
          {DAYS_OF_THE_WEEK_SHORT.map((day) => (
            <Chip
              className="capitalize font-normal cursor-pointer"
              key={day}
              variant={selectedDay === day ? "secondary_dark" : "primary_dark"}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </Chip>
          ))}
        </section>
        <section className="flex items-center mt-14 gap-14">
          <p>Horário</p>
          <TimeInput value={selectedStart} onChange={setSelectedStart} />
          <TimeInput value={selectedEnd} onChange={setSelectedEnd} />
        </section>
        <section className="w-72 mt-20 ml-auto">
          <Button
            onClick={handleSaveAvailability}
            size="small"
            className="font-bold"
            variant="secondary"
          >
            Agendar horários
          </Button>
        </section>
        <div className="bg-gray-03 h-px w-full mt-14" />
        <section className="flex pt-14  flex-col text-gray-05 font-semibold">
          {availability.map((slot) => (
            <section key={slot.weekDay} className="flex gap-14 items-center">
              <article className="min-w-[80px]">
                <p>{slot.weekDay}</p>
              </article>
              <article className="min-w-[120px]">
                {slot.startHour} até {slot.endHour}
              </article>
              <MdClose
                className="cursor-pointer"
                onClick={() => removeAvailability(slot)}
              />
            </section>
          ))}
        </section>
        <section className="w-72 mt-20 ml-auto">
          <Button
            size="small"
            className="font-bold border-none"
            variant="primary"
          >
            Marcar mentoria
          </Button>
        </section>
      </section>
    </Modal>
  );
};
