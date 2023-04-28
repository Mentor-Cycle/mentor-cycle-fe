import Modal from "@components/Modal";
import Calendar from "@components/Calendar/Calendar";
import Image from "next/image";
import Stepper from "@components/Stepper/Stepper";
import { useCallback, useEffect, useState } from "react";
import { buttonVariant } from "@components/Button/Button.types";
import Chip from "@components/Chip";
import { useMentorProfile } from "@hooks/useMentorProfile";
import { id } from "date-fns/locale";
import { useRouter } from "next/router";
import Spinner from "@components/Spinner";
import Button from "@components/Button";
import { useQuery } from "@apollo/client";
import { GET_AVAILABILITIES } from "services/apollo/queries";
import { MentorAvailability } from "./types";
import clsx from "clsx";

export const ScheduleMentorshipModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [daySelected, setDaySelected] = useState<string>("");
  const [daysAndTimes, setDaysAndTimes] = useState<Record<string, string[]>>(
    {}
  );
  const [rangeTime, setRangeTime] = useState<string[][]>([]);

  const { mentor, loading, error } = useMentorProfile(id as string);

  const stepButtons: {
    [key: number]: {
      text: string;
      variant: buttonVariant;
    };
  } = {
    1: {
      text: "Continuar",
      variant: "primary",
    },
    2: {
      text: "Confirmar mentoria",
      variant: "primary",
    },
    3: {
      text: "Fechar",
      variant: "secondary",
    },
  };
  const [currentStep, setCurrentStep] = useState(1);
  const handleSteps = () => {
    if (currentStep === 3) {
      setOpen(false);
      return setCurrentStep(1);
    }

    if (currentStep === 2) {
      // call backend

      console.log(selectedDate);
      console.log(selectedStartTime);
      console.log(selectedEndTime);

      // convert to
      // 2023-04-28T23:00:00
      // yyyy-MM-ddTHH:mm:ss

      // seconds are irrelevant but wee need to pass it,
      // just concat + ":00" to the end of the string is enough
    }

    if (open) {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
    } else {
      setCurrentStep(1);
    }
  };
  const { data } = useQuery<MentorAvailability>(GET_AVAILABILITIES, {
    variables: {
      mentorId: mentor.id,
    },
  });

  const convertAvailabilitiyDays = useCallback(
    (data: MentorAvailability) => {
      data.findMentorAvailability.availability.forEach((item) => {
        const [startDate, startTime] = item.startDate.split("T");
        const [_, endTime] = item.endDate.split("T");
        const [year, month, day] = startDate.split("-");
        const parsedDay = `${day}/${month}/${year}`;

        const newDaysAndTimes = daysAndTimes;
        newDaysAndTimes[parsedDay] = [
          ...(newDaysAndTimes[parsedDay] || []),
          startTime.slice(0, 5),
        ];
        setRangeTime((prev) => [
          ...prev,
          [startTime.slice(0, 5), endTime.slice(0, 5)],
        ]);
        setDaysAndTimes(newDaysAndTimes);
      });
    },
    [daysAndTimes]
  );

  const resetStates = () => {
    setSelectedStartTime("");
    setSelectedEndTime("");
    setSelectedDate(undefined);
    setDaySelected("");
    setDaysAndTimes({});
    setRangeTime([]);
    setCurrentStep(1);
    setOpen(false);
  };

  const getDateNamePhrase = (date: Date) => {
    const dayName = date.toLocaleDateString("pt-BR", { weekday: "long" });
    const weeklyDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    const day = selectedDate?.getDate();
    const month = selectedDate?.toLocaleString("pt-BR", {
      month: "long",
    });
    const year = selectedDate?.getFullYear();

    return `${weeklyDay} ${day} de ${month} de ${year}`;
  };

  useEffect(() => {
    if (data) {
      convertAvailabilitiyDays(data);
      const availableDays = Object.keys(daysAndTimes);
      setAvailableDays(availableDays);
    }
  }, [convertAvailabilitiyDays, data, daysAndTimes]);

  useEffect(() => {
    const time = rangeTime.find((time) => time[0] === selectedStartTime);
    if (time) {
      setSelectedEndTime(time[1]);
    }
  }, [rangeTime, selectedStartTime]);

  if (loading)
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <Spinner />
        </div>
        ;
      </>
    );
  if (error) {
    router.replace("/404");
    return null;
  }

  return (
    <Modal open={open} onOpenChange={resetStates}>
      <div className="px-16 py-12 flex flex-col justify-center items-center">
        {currentStep === 1 && (
          <>
            <div className="rounded-lg flex w-full justify-center items-center">
              <Image
                src={"/imgCard.png"}
                alt="avatar profile"
                width={98}
                height={98}
              />
            </div>
            <h2 className="text-2xl text-secondary-03 font-semibold mt-10">
              Mentoria com {mentor.firstName} {mentor.lastName}
            </h2>
            <p className="text-base text-gray-05 text-center max-w-md mt-4 mb-10">
              Escolha um dia para visualizar os horários disponíveis para marcar
              sua mentoria
            </p>
          </>
        )}
        <Stepper size="small" steps={[1, 2, 3]} currentStep={currentStep} />
        {currentStep === 1 && (
          <>
            <div className="mt-10">
              <Calendar
                daySelected={daySelected}
                selectedDate={selectedDate}
                setDaySelected={setDaySelected}
                setSelectedDate={setSelectedDate}
                availableDays={availableDays}
              />
            </div>
            <div className="w-full">
              <h3 className="mb-6 mt-8">Horários disponíveis</h3>
              <ul className="grid grid-cols-6 gap-4 max-w-md place-items-center mx-auto">
                {daysAndTimes[daySelected]?.map((time) => (
                  <li key={time}>
                    <Chip
                      className="cursor-pointer"
                      size="small"
                      onClick={() => setSelectedStartTime(time)}
                      key={time + String(Math.random())}
                      variant={
                        selectedStartTime === time ? "secondary" : "outlined"
                      }
                    >
                      {time}
                    </Chip>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <hr className="text-gray-02 w-full mt-16" />
            <h2 className="mt-16 font-bold text-2xl">Mentoria de 30 minutos</h2>
            <p className="mt-6">
              <span className="font-bold">Horário:</span>{" "}
              {selectedStartTime.replace(":", "h")} até as{" "}
              {selectedEndTime.replace(":", "h")}
            </p>
            <p className="mt-2">
              <span className="font-bold">Data:</span>{" "}
              {getDateNamePhrase(selectedDate || new Date())}
            </p>
          </>
        )}
        {currentStep === 3 && (
          <>
            <h2 className="font-bold text-3xl order-[-2]">
              Mentoria agendada!
            </h2>
            <p className="mt-2 mb-16 max-w-sm order-[-1] text-gray-03">
              Sua mentoria foi agendada no seu calendário e do Ronald Richards
            </p>
          </>
        )}
        <div className="mt-11 min-w-[183px]">
          <Button
            size="small"
            type="button"
            variant={stepButtons[currentStep].variant}
            onClick={handleSteps}
          >
            {stepButtons[currentStep].text}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
