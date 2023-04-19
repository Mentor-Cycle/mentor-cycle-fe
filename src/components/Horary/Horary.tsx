import { HoraryProps } from "./Horary.types";
import { useEffect, useState } from "react";

function Horary({ reservedDate }: HoraryProps) {
  const [buttonSelecioned, setButtonSelecioned] = useState<string | null>(null);
  const changeHoursSelected = (hours: string) => {
    setButtonSelecioned(hours);
  };

  useEffect(() => {
    console.log(buttonSelecioned);
  }, [buttonSelecioned]);

  return (
    <div className="text-center">
      <p className="text-base text-secondary-05 mb-6">Horários disponíveis</p>
      <div className="grid grid-cols-6 gap-4">
        {reservedDate.map((hours) => (
          <button
            key={hours}
            className={`border-gray-03 border rounded-2xl text-xs py-1 ${
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
  );
}

export default Horary;
