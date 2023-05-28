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
import { InfoCard } from "@components/InfoCard";

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
          <p
            className={`text-base w-full ${
              mentor.biography
                ? "text-secondary-05 overflow-hidden break-words"
                : "text-gray-05"
            }`}
          >
            {mentor.biography || "Complete seu sobre mim"}
          </p>
          <h2 className="text-2xl font-bold leading-normal mb-4 text-secondary-02 mt-12">
            Experiência profissional
          </h2>
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
          <section className="pt-12 pb-12 px-4 pl-0 flex flex-col lg:flex-row flex-wrap gap-y-8 border-gray-03 border-t border-solid">
            <InfoCard
              title="E-mail"
              label="example@email.com"
              content={mentor.email || ""}
            />
            <InfoCard
              title="Portfólio/GitHub"
              label="exemplo.com.br"
              content={mentor.github || ""}
              alignRight
            />
            <InfoCard
              title="País/Estado"
              label="example@email.com"
              content={`${validateUndefined(mentor.country) || "País"}${
                mentor.country === "Brasil" && mentor.state
                  ? `/${validateUndefined(mentor.state)}`
                  : ""
              }`}
              contentToValidate={mentor.country}
            />
            <InfoCard
              title="Carreira"
              label="example@email.com"
              content={
                mentor.yearsOfExperience
                  ? `${parseInt(
                      mentor.yearsOfExperience < 30
                        ? mentor.yearsOfExperience
                        : "30+"
                    )} ${
                      mentor.yearsOfExperience > 1 ? "anos" : "ano"
                    } de experiência`
                  : "experiência que você possui"
              }
              contentToValidate={mentor.yearsOfExperience}
              alignRight
            />
            <InfoCard
              title="Linkedin"
              label="linkedin.com/in/example"
              content={mentor.linkedin || ""}
            />
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
