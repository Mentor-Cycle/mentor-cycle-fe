import { useQuery } from "@apollo/client";
import Button from "@components/Button";
import Chip from "@components/Chip";
import DashboardCardProfile from "@components/DashboardCardProfile";
import EditProfile from "@components/EditProfile/EditeProfile";
import { MentorModalAvailability } from "@components/MentorModalAvailability/MentorModalAvailability";
import MentoringWeekCard from "@components/MentoringWeekCard/MentoringWeekCard";
import { renderMentoringWeekCard } from "@components/MentoringWeekCard/renderMentoringWeekCards";
import Spinner from "@components/Spinner";
import { useMentorProfile } from "@hooks/useMentorProfile";
import { useUser } from "@hooks/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_EVENTS } from "services/apollo/queries";
import { groupEventsByDay } from "utils/dashboard-helpers";
import { validateUndefined } from "utils/nullable/validateUndefined";

const Profile: NextPage = () => {
  const [openModalAvailability, setOpenModalAvailability] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const { mentor, loading, error, refetch } = useMentorProfile(
    user.id as string
  );

  const [eventsByDay, setEventsByDay] = useState({});

  const { data: classes, loading: loadingClasses } = useQuery(GET_EVENTS, {
    variables: {
      learnerId: user.id,
    },
  });

  useEffect(() => {
    if (classes) {
      const eventsByDay = groupEventsByDay(classes.findEvents);
      setEventsByDay(eventsByDay);
    }
  }, [classes]);
  if (loading || loadingClasses)
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <Spinner />
        </div>
        ;
      </>
    );

  const handleOpenModalAvailability = () =>
    setOpenModalAvailability(!openModalAvailability);

  return (
    <main className="pb-12">
      <div className="bg-header-dashboard min-h-[200px] bg-no-repeat bg-cover flex justify-center items-center">
        <div className="flex justify-center sm:justify-start container">
          <DashboardCardProfile
            avatar={user.photoUrl || "/imgCard.png"}
            job={user.jobTitle || ""}
            name={`${user.firstName} ${user.lastName}`}
            skills={user?.skills || []}
          />
        </div>
      </div>

      <div className="container flex justify-between flex-wrap pt-8 gap-8">
        <div className="max-w-xl">
          <section>
            <h2 className="text-2xl font-bold leading-normal mb-4">
              Sobre mim
            </h2>
            {user.biography ? (
              <p className="text-base text-secondary-05">{user.biography}</p>
            ) : (
              <p className="text-gray-05 text-base">Complete seu sobre mim</p>
            )}
          </section>
          <section className="mt-12 pb-12">
            <h2 className="text-2xl font-bold leading-normal mb-4">
              Experiência profissional
            </h2>
            {user.description ? (
              <p className="text-base text-secondary-05">{user.description}</p>
            ) : (
              <p className="text-gray-05 text-base">
                Escreva suas principais experiências profissionais
              </p>
            )}
          </section>
          <section className="pt-12 flex flex-wrap gap-y-8 border-gray-03 border-t border-solid">
            {user.email ? (
              <p className="font-bold basis-1/2">{user.email}</p>
            ) : (
              <p className="text-gray-05 text-base">exemplo@gmail.com</p>
            )}
            {user.github ? (
              <p className="font-bold basis-1/2">{user.github}</p>
            ) : (
              <p className="text-gray-05 text-base">exemplo.com.br</p>
            )}
            {user.country && user.state ? (
              <p className="font-bold basis-1/2">{`${
                validateUndefined(user.country) || "País"
              }/${validateUndefined(user.state) || "Estado"}`}</p>
            ) : (
              <p className="text-gray-05 text-base">
                Digite seu País/Estado aqui
              </p>
            )}
            {user.yearsOfExperience ? (
              <p className="font-bold basis-1/2">{`${user.yearsOfExperience} anos de experiência`}</p>
            ) : (
              <p className="text-gray-05 text-base">
                experiência que você possui
              </p>
            )}
          </section>
        </div>
        <section>
          <h2 className="text-3xl font-bold mb-12">
            Agenda {user.isMentor ? "do Mentor" : "de Mentorias"}
          </h2>
          {user.isMentor &&
            (mentor?.availability?.length ? (
              <div className="flex flex-col gap-4">
                {mentor.availability.map((availability, index) => (
                  <MentoringWeekCard
                    key={availability.weekDay + index}
                    day={availability.weekDay}
                    description={
                      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet."
                    }
                    chips={availability.slots.map((slot) => (
                      <Chip key={slot} variant="quartenary">
                        {slot}
                      </Chip>
                    ))}
                  />
                ))}
              </div>
            ) : (
              <div className="max-w-xs border border-gray-03 flex justify-center items-center w-full h-[136px] rounded-lg">
                <p className="text-center text-gray-03">
                  Não possui nenhuma mentoria agendada
                </p>
              </div>
            ))}
          {!user.isMentor && (
            <div className="flex flex-col gap-4">
              {classes?.findEvents.length > 0 && !loading ? (
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
            refetchMentorProfile={refetch}
          />
          {user.isMentor && (
            <Button
              className="mt-12"
              size="regular"
              variant="primary"
              onClick={handleOpenModalAvailability}
            >
              {mentor?.availability?.length ? "Nova agenda" : "Criar agenda"}
            </Button>
          )}
          <Button
            className="mt-12"
            size="regular"
            variant="secondary"
            onClick={() => setOpenEditProfile(!openEditProfile)}
          >
            Editar Perfil
          </Button>
        </section>
      </div>
      {
        <EditProfile
          openEditProfile={openEditProfile}
          setOpenEditProfile={setOpenEditProfile}
        />
      }
    </main>
  );
};

export default Profile;
