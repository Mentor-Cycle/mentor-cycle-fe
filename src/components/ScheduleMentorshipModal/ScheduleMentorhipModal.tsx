import Modal from "@components/Modal";
import Calendar from "@components/Calendar/Calendar";
import Image from "next/image";
import Stepper from "@components/Stepper/Stepper";
import { useCallback, useEffect, useState } from "react";
import { buttonVariant } from "@components/Button/Button.types";
import Chip from "@components/Chip";
import { useMentorProfile } from "@hooks/useMentorProfile";
import { useRouter } from "next/router";
import Spinner from "@components/Spinner";
import Button from "@components/Button";
import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@hooks/useUser";
import { CREATE_EVENT } from "services/apollo/mutations";
import { toast } from "react-toastify";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import { TGET_AVAILABILITIES_queryDataSchema as TUserAvailability } from "services/apollo/queries/queries-properties";
import { TStepButtons } from "@components/ScheduleMentorshipModal/ScheduleMentorhipModal.types";

export const ScheduleMentorshipModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const id = router.query.id;
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [daySelected, setDaySelected] = useState<string>("");
  const [daysAndTimes, setDaysAndTimes] = useState<Record<string, string[]>>(
    {}
  );
  const [convertedDaysAndTimes, setConvertedDaysAndTimes] = useState<string[]>(
    []
  );

  const [times, setTimes] = useState<string[]>([]);

  const [rangeTime, setRangeTime] = useState<string[][]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    mentor,
    loading: loadingMentor,
    error: errorMentor,
  } = useMentorProfile(id as string, {
    skip: !id,
  });
  if (errorMentor?.error) console.log("errorMentor", errorMentor);

  const { user } = useUser();
  const [createEvent, { loading: loadingEvent, error: errorEvent }] =
    useMutation(CREATE_EVENT);
  if (errorEvent) console.log("errorEvent", errorEvent);

  const stepButtons: TStepButtons = {
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

  const {
    data: availabilitiesResponse,
    refetch: refetchAvailabitities,
    error: errorAvailabilitiesResponse,
  } = useTypedQuery(api.GET_AVAILABILITIES, {
    variables: {
      mentorId: mentor?.id as string,
    },
    skip: !mentor?.id,
  });
  if (errorAvailabilitiesResponse?.error)
    console.log("errorAvailabilitiesResponse", errorAvailabilitiesResponse);

  const availabilities =
    availabilitiesResponse?.findMentorAvailability.availability ?? null;

  const handleSteps = async () => {
    await refetchAvailabitities();
    if (currentStep === 3) {
      resetStates();
      return setConvertedDaysAndTimes([...new Set(daysAndTimes[daySelected])]);
    }

    if (currentStep === 2) {
      const [day, month, year] = daySelected.split("/");
      const startDate = `${year}-${month}-${day}T${selectedStartTime}:00`;
      const endDate = `${year}-${month}-${day}T${selectedEndTime}:00`;
      const payload = {
        startDate,
        endDate,
        mentorId: id,
        learnerId: user.id,
        active: true,
        status: "CONFIRMED",
      };
      await createEvent({ variables: { event: payload } });
      if (errorEvent) {
        return toast.error("Erro ao criar evento");
      }
      resetStates(false, false);
    }

    if (open) {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
    } else {
      setCurrentStep(1);
    }
  };

  const convertAvailabilitiyDays = useCallback(
    (availabilities: TUserAvailability["availability"]) => {
      if (!availabilities) return;
      availabilities.forEach((item) => {
        const [startDate, startTime] = item.startDate.split("T");
        const [_, endTime] = item.endDate.split("T");
        const [year, month, day] = startDate.split("-");
        const parsedDay = `${day}/${month}/${year}`;
        const newDaysAndTimes = daysAndTimes;
        const currentHour = new Date().toLocaleTimeString("pt-BR", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        });
        if (currentHour > startTime && new Date().getDate() === Number(day)) {
          return;
        }

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

  const resetStates = async (close: boolean = true, resetStep = true) => {
    setSelectedStartTime("");
    setSelectedEndTime("");
    setSelectedDate(undefined);
    setConvertedDaysAndTimes([]);
    setDaySelected("");
    setDaysAndTimes({});
    setRangeTime([]);
    if (resetStep) {
      setCurrentStep(1);
    }
    if (close) {
      setOpen(false);
    }
    await refetchAvailabitities();
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
    if (availabilitiesResponse) {
      convertAvailabilitiyDays(availabilities);
      const availableDays = Object.keys(daysAndTimes);
      setAvailableDays(availableDays);
    }
  }, [
    convertAvailabilitiyDays,
    availabilitiesResponse,
    daysAndTimes,
    availabilities,
  ]);

  useEffect(() => {
    const time = rangeTime.find((time) => time[0] === selectedStartTime);
    if (time) {
      setSelectedEndTime(time[1]);
    }
  }, [rangeTime, selectedStartTime]);

  useEffect(() => {
    const times = daysAndTimes[daySelected];
    if (times) {
      setTimes(times);
    }
  }, [daySelected, daysAndTimes]);

  useEffect(() => {
    setConvertedDaysAndTimes([...new Set(daysAndTimes[daySelected])]);
  }, [daySelected, daysAndTimes]);

  if (loadingMentor)
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );

  return (
    <Modal open={open} onOpenChange={() => resetStates()}>
      <div className="px-4 py-4 xs:px-4 sm:px-16 sm:py-12 flex flex-col justify-center items-center">
        {currentStep === 1 && (
          <>
            <div className="rounded-lg flex w-full justify-center items-center">
              <Image
                src={mentor?.photoUrl || "/imgCard.png"}
                alt="avatar profile"
                width={98}
                height={98}
                className="rounded-lg"
              />
            </div>
            {mentor ? (
              <h2 className="text-2xl text-secondary-03 font-semibold mt-10">
                Mentoria com {mentor.firstName} {mentor.lastName}
              </h2>
            ) : (
              <h2 className="text-2xl text-secondary-03 font-semibold mt-10">
                Carregando...
              </h2>
            )}
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
              <h3 className="mb-6 mt-8 text-secondary-03">
                Horários disponíveis
              </h3>
              <ul className="grid grid-cols-3 xs:grid-cols-6 gap-4 max-w-md place-items-center mx-auto">
                {convertedDaysAndTimes?.map((time) => (
                  <li key={time} className="text-secondary-03">
                    <Chip
                      className="cursor-pointer w-[56px]"
                      size="small"
                      onClick={() => setSelectedStartTime(time)}
                      key={time}
                      variant={
                        selectedStartTime === time ? "secondary" : "chipCards"
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
            <div className="min-w-[280px]">
              <hr className="text-gray-02 w-full mt-16" />
              <h2 className="mt-16 font-bold text-2xl text-secondary-02">
                Mentoria de 30 minutos
              </h2>
              <p className="mt-6 text-secondary-02">
                <span className="font-bold text-secondary-02">Horário:</span>{" "}
                {selectedStartTime.replace(":", "h")} até as{" "}
                {selectedEndTime.replace(":", "h")}
              </p>
              <p className="mt-2 text-secondary-02">
                <span className="font-bold">Data:</span>{" "}
                {getDateNamePhrase(selectedDate || new Date())}
              </p>
            </div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <div className="min-w-[280px]"></div>
            <h2 className="font-bold text-3xl order-[-2] text-secondary-02">
              Mentoria agendada!
            </h2>
            {mentor ? (
              <p className="mt-2 mb-16 max-w-sm order-[-1] text-gray-03">
                Sua mentoria foi agendada no seu calendário e do(a){" "}
                {mentor.firstName} {mentor.lastName}
              </p>
            ) : (
              <p className="mt-2 mb-16 max-w-sm order-[-1] text-gray-03">
                Sua mentoria foi agendada no seu calendário e do(a){" "}
                Carregando...
              </p>
            )}
          </>
        )}
        <div className="mt-11 min-w-[183px]">
          <Button
            size="small"
            type="button"
            disabled={currentStep === 1 && (!daySelected || !selectedStartTime)}
            variant={stepButtons[currentStep].variant}
            onClick={handleSteps}
            isLoading={loadingMentor || loadingEvent}
          >
            {stepButtons[currentStep].text}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
