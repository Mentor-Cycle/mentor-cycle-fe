import Button from "@components/Button";
import Chip from "@components/Chip/Chip";
import Modal from "@components/Modal";
import TimeInput from "@components/TimeInput/TimeInput";
import { DAYS_OF_THE_WEEK_SHORT } from "config/constants";
import { use, useEffect, useState } from "react";
import {
  AvailabilitySlot,
  saveAvailabilityInMemory,
} from "./helpers/saveAvailability";
import { MdClose } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { PERSIST_AVAILABILITY } from "services/apollo/mutations";
import { useUser } from "@hooks/useUser";
import { toast } from "react-toastify";
import { SuccessfullyCreated } from "./SuccessullyCreated";
import { GET_AVAILABILITIES } from "services/apollo/queries";
import { MentorAvailability } from "@components/ScheduleMentorshipModal/types";

export const MentorModalAvailability = ({
  open,
  setOpen,
  refetchMentorProfile,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchMentorProfile: any;
}) => {
  const { user, setUser } = useUser();
  const [persistAvailability, { loading }] = useMutation(PERSIST_AVAILABILITY);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string>(
    DAYS_OF_THE_WEEK_SHORT[0]
  );
  const [selectedStart, setSelectedStart] = useState<string>("12:00");
  const [selectedEnd, setSelectedEnd] = useState<string>("12:30");
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const { data } = useQuery<MentorAvailability>(GET_AVAILABILITIES, {
    variables: {
      mentorId: user?.id || "",
    },
  });

  const handleSaveAvailability = () => {
    saveAvailabilityInMemory(
      selectedDay,
      selectedStart,
      selectedEnd,
      availability,
      setAvailability
    );
  };

  const handlePersistAvailability = async () => {
    const formattedAvailability = availability.map((slot) => ({
      ...slot,
      weekDay: DAYS_OF_THE_WEEK_SHORT.indexOf(slot.weekDay),
      active: true,
    }));

    const { errors } = await persistAvailability({
      variables: {
        availability: {
          availabilities: formattedAvailability,
          mentorId: user?.id || "",
        },
      },
    });

    if (errors?.length) {
      toast.error("Erro ao cadastrar disponibilidade");
    }

    setOpen(false);
    setSuccessModal(true);
    setUser((prev: any) => ({ ...prev, availability: formattedAvailability }));
    refetchMentorProfile();
  };

  const removeAvailability = (slot: AvailabilitySlot) => {
    const newAvailability = availability.filter(
      (item) => item.weekDay !== slot.weekDay
    );
    setAvailability(newAvailability);
  };

  return (
    <>
      <Modal open={open} onOpenChange={setOpen}>
        <section className=" text-left z-20 p-8  w-[300px] xs:w-[380px] sm:w-auto">
          <h1 className="inline text-secondary-03 font-semibold text-2xl mb-2">
            Horário de mentoria
          </h1>
          <p className="text-secondary-02">
            Defina seus horários e datas disponíveis
          </p>
          <p className="text-sm sm:text-base text-primary-05 mt-2">
            *O tempo de cada mentoria é de aproximadamente 30 minutos.
          </p>
          <p className="text-sm sm:text-base text-primary-05 mt-2">
            Cada mentoria deve ser criada com esse intervalo, podendo ter vários
            horários disponíveis no mesmo dia.
          </p>
          <section className=" flex gap-4 mt-12 flex-wrap max-w-[100px] xs:max-w-[200px] sm:max-w-[450px] md:max-w-max m-auto">
            {DAYS_OF_THE_WEEK_SHORT.map((day) => (
              <div className=" min-w-[75px] m-auto sm:m-0 " key={day}>
                <Chip
                  className="capitalize font-normal cursor-pointer "
                  key={day}
                  variant={
                    selectedDay === day ? "secondary_dark" : "primary_dark"
                  }
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </Chip>
              </div>
            ))}
          </section>
          <section className="flex flex-col sm:flex-row items-center  justify-between md:justify-center mt-14 gap-4 sm:gap-8 dark:text-neutral-02">
            <div>
              <p className="text-secondary-03">Horário</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 ">
              <TimeInput value={selectedStart} onChange={setSelectedStart} />
              <TimeInput value={selectedEnd} onChange={setSelectedEnd} />
            </div>
          </section>
          <section className="mt-14 m-auto max-w-[450px]">
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
              <section
                key={slot.weekDay}
                className="flex flex-col xs:flex-row xs:space-x-4 items-center mt-2 m-auto"
              >
                <article className="">
                  <p className="text-secondary-03 font-bold">{slot.weekDay}</p>
                </article>
                <article className="text-secondary-01 dark:text-neutral-02">
                  {slot.startHour} até {slot.endHour}
                </article>
                <MdClose
                  className="cursor-pointer text-secondary-01 dark:text-neutral-02"
                  onClick={() => removeAvailability(slot)}
                />
              </section>
            ))}
          </section>
          <section className=" mt-20 m-auto max-w-[450px]">
            <Button
              onClick={handlePersistAvailability}
              isLoading={loading}
              size="small"
              className="font-bold border-none"
              variant="primary"
            >
              Criar Agenda
            </Button>
          </section>
        </section>
      </Modal>
      <SuccessfullyCreated
        open={successModal}
        onClose={() => setSuccessModal(false)}
      />
    </>
  );
};
