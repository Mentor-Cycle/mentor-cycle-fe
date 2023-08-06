import Button from "@components/Button";
import Chip from "@components/Chip";
import DashboardCardProfile from "@components/DashboardCardProfile";
import { InfoCard } from "@components/InfoCard";
import { MentorModalAvailability } from "@components/MentorModalAvailability/MentorModalAvailability";
import MentoringWeekCard from "@components/MentoringWeekCard/MentoringWeekCard";
import { renderMentoringWeekCard } from "@components/MentoringWeekCard/renderMentoringWeekCards";
import Spinner from "@components/Spinner";
import { useMentorProfile } from "@hooks/useMentorProfile";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { useUser } from "@hooks/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import { IGroupEventsByDay } from "types/dashboard.types";
import { useModal } from "contexts/ModalContext";
import { ModalActionTypes } from "contexts/types";
import { groupEventsByDay } from "utils/dashboard-helpers";
import { validateUndefined } from "utils/nullable/validateUndefined";

const Profile: NextPage = () => {
  const [openModalAvailability, setOpenModalAvailability] = useState(false);
  const { openModal, closeModal } = useModal();
  const [eventsByDay, setEventsByDay] = useState<IGroupEventsByDay>({});
  const { user } = useUser();
  const router = useRouter();

  const {
    mentor,
    loading: loadingMentor,
    refetch: refetchMentor,
    error: mentorError,
  } = useMentorProfile(user.id, {
    skip: !user.isMentor,
  });
  if (mentorError?.error) console.error("mentorError", mentorError);

  const {
    data: classes,
    loading: loadingClasses,
    error: classesError,
  } = useTypedQuery(api.GET_EVENTS, {
    variables: {
      learnerId: user.id,
    },
  });
  if (classesError?.error) console.log("classesError", classesError);

  useEffect(() => {
    if (router.query.edit) {
      closeModal(ModalActionTypes.EDIT_PROFILE_MODAL);
    }
    if (router.query.availability) {
      setOpenModalAvailability(true);
    }
    window.history.replaceState(null, "", "/profile");
  }, [router.query.availability, router.query.edit, closeModal]);

  useEffect(() => {
    // essa lógica pode ser colocada dentro do onCompleted do useTypedQuery e evitar um useEffect
    if (classes) {
      const filteredEvents = classes.findEvents.filter((mentor) => {
        return mentor.mentorId !== user.id && !user.isMentor;
      });
      const eventsByDay = groupEventsByDay(filteredEvents);
      setEventsByDay(eventsByDay);
    }
  }, [classes, user.id, user.isMentor]);

  if (loadingMentor || loadingClasses)
    return (
      <>
        <div className="flex min-h-screen items-center justify-center">
          <Spinner />
        </div>
      </>
    );

  const handleOpenModalAvailability = () =>
    setOpenModalAvailability((isOpen) => !isOpen);

  return (
    <>
      <header>
        <section className="flex min-h-[200px] items-center justify-center bg-header-dashboard bg-cover bg-no-repeat">
          <div className="container flex justify-start ">
            <DashboardCardProfile
              avatarUrl={user.photoUrl || "/imgCard.png"}
              job={user.jobTitle || ""}
              name={`${user.firstName} ${user.lastName ?? ""}`}
              skills={user?.skills}
            />
          </div>
        </section>
      </header>
      <main className="container mb-28 mt-12 grid min-h-screen grid-cols-1 md:grid-cols-2">
        <aside>
          <h2 className="mb-4 text-2xl font-bold leading-normal text-secondary-02">
            Sobre mim
          </h2>
          <p
            className={`w-full text-base ${
              user.biography
                ? "overflow-hidden break-words text-secondary-05"
                : "text-gray-05"
            }`}
          >
            {user.biography || "Complete seu sobre mim"}
          </p>
          <h2 className="mb-4 mt-12 text-2xl font-bold leading-normal text-secondary-02">
            Experiência profissional
          </h2>
          <p
            className={`mb-12 w-full text-base ${
              user.description
                ? "overflow-hidden break-words text-secondary-05"
                : "text-gray-05"
            }`}
          >
            {user.description.length
              ? user.description
              : "Escreva suas principais experiências profissionais"}
          </p>
          <section className="flex flex-col flex-wrap gap-y-8 border-t border-solid border-gray-03 pb-12 pt-12 text-start lg:flex-row">
            <InfoCard
              title="Portfólio/GitHub"
              label="Não informado"
              content={user.github ?? ""}
              alignRight
            />
            <InfoCard
              alignRight
              title="País/Estado"
              label="Não informado"
              content={`${validateUndefined(user.country) || "País"}${
                user.country === "Brasil" && user.state
                  ? `/${validateUndefined(user.state)}`
                  : ""
              }`}
              contentToValidate={user.country}
            />
            <InfoCard
              title="Carreira"
              label="Não informado"
              content={
                user.yearsOfExperience
                  ? `${
                      user.yearsOfExperience < 30
                        ? user.yearsOfExperience
                        : "30+"
                    } ${
                      user.yearsOfExperience > 1 ? "anos" : "ano"
                    } de experiência`
                  : "Não informado"
              }
              contentToValidate={user.yearsOfExperience}
              alignRight
            />
            <InfoCard
              title="Linkedin"
              label="Não informado"
              content={user.linkedin ?? ""}
              alignRight
            />
          </section>
        </aside>
        <aside className="flex justify-center md:items-start md:justify-end">
          <div className="max-w-[290px]">
            <h2 className="mb-12 text-center text-2xl font-bold text-secondary-02 sm:text-start ">
              Agenda {user.isMentor ? "do Mentor" : "de Mentorias"}
            </h2>
            {user.isMentor &&
              (mentor?.availability?.length ? (
                <div className="m-auto w-[290px]">
                  <div className="flex flex-col gap-4">
                    {mentor.availability.map((availability, index) => {
                      return (
                        <MentoringWeekCard
                          key={availability.weekDay + index}
                          day={availability.weekDay}
                          description="Horários disponíveis:"
                          chips={availability.slots.map((slot) => (
                            <Chip key={slot} variant="chipCards">
                              {slot}
                            </Chip>
                          ))}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex h-[136px] w-full max-w-xs items-center justify-center rounded-lg border border-gray-03">
                  <p className="text-center text-gray-03">
                    Não possui nenhuma mentoria agendada
                  </p>
                </div>
              ))}
            {!user.isMentor && classes?.findEvents && (
              <div className="flex flex-col gap-4">
                {classes.findEvents.length && !loadingMentor ? (
                  renderMentoringWeekCard(eventsByDay)
                ) : (
                  <div className="flex h-[136px] w-full max-w-xs items-center justify-center rounded-lg border border-gray-03">
                    <p className="text-center text-gray-03">
                      Não possui nenhuma mentoria agendada
                    </p>
                  </div>
                )}
              </div>
            )}
            <MentorModalAvailability
              open={openModalAvailability}
              setOpen={setOpenModalAvailability}
              refetchMentorProfile={refetchMentor}
            />
            <div className="m-auto max-w-[300px]">
              {user.isMentor && (
                <Button
                  className="mt-12"
                  size="regular"
                  variant="primary"
                  onClick={handleOpenModalAvailability}
                >
                  {mentor?.availability?.length
                    ? "Nova agenda"
                    : "Criar agenda"}
                </Button>
              )}
              <Button
                className="mt-5"
                size="regular"
                variant="secondary"
                onClick={() => openModal(ModalActionTypes.EDIT_PROFILE_MODAL)}
              >
                Editar Perfil
              </Button>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
};

export default Profile;
