import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type Props = {
  value: string;
  onChange: (newTime: string) => void;
};

const TimeInput: React.FC<Props> = ({ value, onChange }) => {
  const [hours, minutes] = value.split(":");
  const [inputHours, setInputHours] = useState(parseInt(hours));
  const [inputMinutes, setInputMinutes] = useState(parseInt(minutes));

  const updateTime = (increment: number) => {
    const newMinutes = inputMinutes + increment;
    const newHours = inputHours + Math.floor(newMinutes / 60);
    const clampedHours = newHours < 0 ? 23 : newHours % 24;
    const clampedMinutes = (newMinutes + 60) % 60;
    const newTime = `${padZero(clampedHours)}:${padZero(clampedMinutes)}`;

    setInputHours(clampedHours);
    setInputMinutes(clampedMinutes);
    onChange(newTime);
  };

  const padZero = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <section className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => updateTime(-30)}
          className="text-2xl text-secondary-03 outline-none"
        >
          <MdChevronLeft className="text-secondary-02 dark:text-neutral-01" />
        </button>
        <p className="text-center w-20 outline-none border-0 bg-transparent text-secondary-03">
          {`${padZero(inputHours)}:${padZero(inputMinutes)}`}
        </p>
        <button
          onClick={() => updateTime(30)}
          className="text-2xl text-secondary-03 outline-none"
        >
          <MdChevronRight className="text-secondary-02 dark:text-neutral-01" />
        </button>
      </div>
    </section>
  );
};

export default TimeInput;
