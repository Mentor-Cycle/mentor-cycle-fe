import Chip from "@components/Chip/Chip";
import Modal from "@components/Modal";
import TimeInput from "@components/TimeInput/TimeInput";
import { DAYS_OF_THE_WEEK } from "config/constants";
import { useState } from "react";

export const MentorModalAvailability = (props: { active: boolean }) => {
  const [selectedDay, setSelectedDay] = useState(DAYS_OF_THE_WEEK[0]);
  const [selectedStart, setSelectedStart] = useState("12:00");
  const [selectedEnd, setSelectedEnd] = useState("12:30");
  return (
    <Modal open={props.active}>
      <section className="w-full px-6">
        <h1 className="inline text-secondary-03 font-semibold text-2xl">
          Horário de mentoria
        </h1>
        <p>Defina seus horários e datas disponíveis</p>
        <section className="flex gap-6 mt-12 flex-wrap">
          {DAYS_OF_THE_WEEK.map((day) => (
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
      </section>
    </Modal>
  );
};
