import Button from "@components/Button";
import Chip from "@components/Chip";
import DashboardCardProfile from "@components/DashboardCardProfile";
import EditProfile from "@components/EditProfile/EditProfile";
import { MentorModalAvailability } from "@components/MentorModalAvailability/MentorModalAvailability";
import MentoringWeekCard from "@components/MentoringWeekCard/MentoringWeekCard";
import { renderMentoringWeekCard } from "@components/MentoringWeekCard/renderMentoringWeekCards";
import Spinner from "@components/Spinner";
import { useMentorProfile } from "@hooks/useMentorProfile";
import { useUser } from "@hooks/useUser";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { groupEventsByDay } from "utils/dashboard-helpers";
import { validateUndefined } from "utils/nullable/validateUndefined";
import { InfoCard } from "@components/InfoCard";
import { useRouter } from "next/router";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import { IGroupEventsByDay } from "types/dashboard.types";

const Profile: NextPage = () => {
  const [openModalAvailability, setOpenModalAvailability] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
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
      setOpenEditProfile(true);
    }
    if (router.query.availability) {
      setOpenModalAvailability(true);
    }
    window.history.replaceState(null, "", "/profile");
  }, [router.query]);

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
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  const handleOpenModalAvailability = () =>
    setOpenModalAvailability((isOpen) => !isOpen);

  return (
    <>
      <header>
        <section className="bg-header-dashboard min-h-[200px] bg-no-repeat bg-cover flex justify-center items-center">
          <div className="flex justify-start container ">
            <DashboardCardProfile
              avatarUrl={user.photoUrl || "/imgCard.png"}
              job={user.jobTitle || ""}
              name={`${user.firstName} ${user.lastName ?? ""}`}
              skills={user?.skills}
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
              user.biography
                ? "text-secondary-05 overflow-hidden break-words"
                : "text-gray-05"
            }`}
          >
            {user.biography || "Complete seu sobre mim"}
          </p>
          <h2 className="text-2xl font-bold leading-normal mb-4 text-secondary-02 mt-12">
            Experiência profissional
          </h2>
          <p
            className={`text-base w-full mb-12 ${
              user.description
                ? "text-secondary-05 overflow-hidden break-words"
                : "text-gray-05"
            }`}
          >
            {user.description.length
              ? user.description
              : "Escreva suas principais experiências profissionais"}
          </p>
          <section className="pt-12 pb-12 flex flex-col lg:flex-row flex-wrap gap-y-8 border-gray-03 border-t border-solid">
            <InfoCard
              title="Portfólio/GitHub"
              label="exemplo.com.br"
              content={user.github ?? ""}
              alignRight
            />
            <InfoCard
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
                  : "experiência que você possui"
              }
              contentToValidate={user.yearsOfExperience}
            />
            <InfoCard
              title="Linkedin"
              label="linkedin.com/in/example"
              content={user.linkedin ?? ""}
            />
          </section>
        </aside>
        <aside className="flex justify-center md:justify-end md:items-start">
          <div className="max-w-[290px]">
            <h2 className="text-2xl font-bold mb-12 text-secondary-02 text-center sm:text-start ">
              Agenda {user.isMentor ? "do Mentor" : "de Mentorias"}
            </h2>
            {user.isMentor &&
              (mentor?.availability?.length ? (
                <div className="w-[290px] m-auto">
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
                <div className="max-w-xs border border-gray-03 flex justify-center items-center w-full h-[136px] rounded-lg">
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
                  <div className="max-w-xs border border-gray-03 flex justify-center items-center w-full h-[136px] rounded-lg">
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
            <div className="max-w-[300px] m-auto">
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
                onClick={() => setOpenEditProfile((isOpen) => !isOpen)}
              >
                Editar Perfil
              </Button>
            </div>
          </div>
        </aside>
      </main>
      {
        <EditProfile
          openEditProfile={openEditProfile}
          setOpenEditProfile={setOpenEditProfile}
        />
      }
    </>
  );
};

export default Profile;
