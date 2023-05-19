import { HoraryProps } from "./Horary.types";
import { useEffect, useState } from "react";

function Horary({ reservedDate, isDateSelecioned }: HoraryProps) {
  const [buttonSelecioned, setButtonSelecioned] = useState<string | null>(null);
  const changeHoursSelected = (hours: string) => {
    setButtonSelecioned(hours);
  };

  return (
    <>
      {isDateSelecioned && (
        <div className="text-center max-[420px]:w-[300px] w-[416px]">
          <p className="text-base text-secondary-05 mb-6">
            Horários disponíveis
          </p>
          <div className="max-[420px]:grid-cols-4 grid grid-cols-6 gap-4 justify-items-center">
            {reservedDate.map((hours) => (
              <button
                key={hours}
                className={`border-gray-03 border rounded-2xl text-xs w-14 h-6 ${
                  buttonSelecioned === hours
                    ? "bg-primary-01 text-neutral-01 border-primary-01"
                    : "bg-neutral-01"
                }`}
                value={hours}
                onClick={() => changeHoursSelected(hours)}
              >
                {hours}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Horary;
