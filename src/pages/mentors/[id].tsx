import Button from "@components/Button";
import Chip from "@components/Chip";
import DashboardCardProfile from "@components/DashboardCardProfile";
import MentoringWeekCard from "@components/MentoringWeekCard/MentoringWeekCard";
import { useMentorProfile } from "@hooks/useMentorProfile";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ScheduleMentorshipModal } from "@components/ScheduleMentorshipModal";
import { validateUndefined } from "utils/nullable/validateUndefined";
import { useQuery } from "@apollo/client";
import {
  AvailabilitySlots,
  MentorAvailability,
} from "@components/ScheduleMentorshipModal/types";
import { GET_AVAILABILITIES } from "services/apollo/queries";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useUser } from "@hooks/useUser";
import Spinner from "@components/Spinner";

const MentorProfile: NextPage = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { user } = useUser();
  const { id } = router.query;
  const { mentor, loading } = useMentorProfile(id as string);

  const { data } = useQuery<MentorAvailability>(GET_AVAILABILITIES, {
    variables: {
      mentorId: id,
    },
  });

  const availabilitiesByWeekDay =
    data?.findMentorAvailability.availability.reduce(
      (acc: AvailabilitySlots, availability) => {
        const weekDayNumber = availability.weekDay;
        const startDate = parseISO(availability.startDate);
        const formattedWeekDay = format(startDate, "EEEE", { locale: ptBR });

        if (!acc[weekDayNumber]) {
          acc[weekDayNumber] = {
            weekDay: formattedWeekDay,
            slots: [],
          };
        }
        acc[weekDayNumber].slots.push(`${availability.startHour}`);
        return acc;
      },
      {}
    );

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <header>
        <section className="bg-header-dashboard min-h-[200px] bg-no-repeat bg-cover flex justify-center items-center">
          <div className="flex justify-start container ">
            <DashboardCardProfile
              avatar={mentor.photoUrl || "/imgCard.png"}
              job={mentor.jobTitle || ""}
              name={`${mentor.firstName} ${mentor.lastName}`}
              skills={mentor?.skills || []}
            />
          </div>
        </section>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 container min-h-screen mb-28 mt-12">
        <aside>
          <h2 className="text-2xl font-bold leading-normal mb-4 text-secondary-02">
            Sobre mim
          </h2>
          <div className="min-h-[200px]">
            <p
              className={`text-base w-full ${
                mentor.biography
                  ? "text-secondary-05 overflow-hidden break-words"
                  : "text-gray-05"
              }`}
            >
              {mentor.biography || "Complete seu sobre mim"}
            </p>
          </div>
          <h2 className="text-2xl font-bold leading-normal mb-4 text-secondary-02 mt-12">
            Experiência profissional
          </h2>
          <div className="min-h-[200px]">
            <p
              className={`text-base w-full mb-12 ${
                mentor.description
                  ? "text-secondary-05 overflow-hidden break-words"
                  : "text-gray-05"
              }`}
            >
              {mentor.description ||
                "Escreva suas principais experiências profissionais"}
            </p>
          </div>
          <section className="pt-12 pb-12 flex flex-col 2xl:flex-row flex-wrap gap-y-8 border-gray-03 border-t border-solid justify-between">
            <div className="border border-gray-03 p-4 rounded bg-neutral-01 dark:bg-transparent min-w-[270px]">
              <span className="text-gray-04 dark:text-neutral-05 text-sm mb-2 block">
                Email
              </span>
              <p
                className={`font-bold text-secondary-02 text-base ${
                  mentor.email ? "" : "text-gray-05 text-base"
                }`}
              >
                {mentor.email || "exemplo@gmail.com"}
              </p>
            </div>
            <div className="border border-gray-03 p-4 rounded bg-neutral-01 dark:bg-transparent min-w-[270px]">
              <span className="text-gray-04 dark:text-neutral-05 text-sm mb-2 block">
                Github/Portifólio
              </span>
              <p
                className={` text-base ${
                  mentor.github
                    ? "font-bold text-secondary-02"
                    : "text-gray-05 text-base"
                }`}
              >
                {mentor.github || "exemplo.com.br"}
              </p>
            </div>
            <div className="border border-gray-03 p-4 rounded bg-neutral-01 dark:bg-transparent min-w-[270px]">
              <span className="text-gray-04 dark:text-neutral-05 text-sm mb-2 block">
                País/Estado
              </span>
              <p
                className={`font-bold text-secondary-02 text-base ${
                  mentor.country ? "" : "text-gray-05 text-base"
                }`}
              >
                {`${validateUndefined(mentor.country) || "País"}${
                  mentor.country === "Brasil" && mentor.state
                    ? `/${validateUndefined(mentor.state)}`
                    : ""
                }`}
              </p>
            </div>
            <div className="border border-gray-03 p-4 rounded bg-neutral-01 dark:bg-transparent min-w-[270px]">
              <span className="text-gray-04 dark:text-neutral-05 text-sm mb-2 block">
                Experiência
              </span>
              <p
                className={`text-base ${
                  mentor.yearsOfExperience
                    ? "font-bold text-secondary-02"
                    : "text-secondary-03"
                }`}
              >
                {mentor.yearsOfExperience
                  ? `${parseInt(
                      mentor.yearsOfExperience < 30
                        ? mentor.yearsOfExperience
                        : "30+"
                    )} ${
                      mentor.yearsOfExperience > 1 ? "anos" : "ano"
                    } de experiência`
                  : "experiência que você possui"}
              </p>
            </div>
          </section>
        </aside>
        <section className="flex flex-col items-center md:items-end">
          <div className="max-w-[295px] w-full">
            <h2 className="text-2xl text-center md:text-start font-bold mb-12 text-secondary-02">
              Agenda de mentorias
            </h2>
            {data?.findMentorAvailability.availability.length ? (
              <div className="flex flex-col gap-4">
                {availabilitiesByWeekDay &&
                  Object.values(availabilitiesByWeekDay).map(
                    (availability, index) => (
                      <MentoringWeekCard
                        key={availability.weekDay + index}
                        day={availability.weekDay}
                        description={
                          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet."
                        }
                        chips={availability.slots.map((slot) => (
                          <Chip key={slot} variant="chipCards">
                            {slot}
                          </Chip>
                        ))}
                      />
                    )
                  )}
              </div>
            ) : (
              <div className="max-w-xs p-6 border border-gray-03 rounded-lg">
                <p className="text-secondary-02">
                  O mentor ja está com a agenda lotada para a semana!
                </p>
              </div>
            )}
            <ScheduleMentorshipModal open={openModal} setOpen={setOpenModal} />
            {user.isMentor ? (
              <>
                <div className="max-w-xs mt-4">
                  <Button size="small" disabled>
                    Vá até Configurações e altere seu perfil para agendar
                    mentorias.
                  </Button>
                </div>
              </>
            ) : (
              <Button
                className="mt-12"
                size="regular"
                variant="primary"
                onClick={() => setOpenModal(true)}
              >
                Agendar mentoria
              </Button>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default MentorProfile;
