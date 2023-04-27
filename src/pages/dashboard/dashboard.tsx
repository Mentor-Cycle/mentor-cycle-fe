import DashboardCardProfile from "@components/DashboardCardProfile";
import Select from "react-select";
import MentoringLinkCard from "@components/MentoringLinkCard";
import Spinner from "@components/Spinner/Spinner";
import MentoringWeekCard from "@components/MentoringWeekCard";
import Chip from "@components/Chip/Chip";
import ptBR from "date-fns/locale/pt-BR";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "providers/user/AppContext";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "services/apollo/querys";
import {
  formatDate,
  formatHour,
  groupEventsByDay,
} from "utils/dashboard-helpers";
import { renderMentoringWeekCard } from "@components/MentoringWeekCard/renderMentoringWeekCards";

const Dashboard: NextPage = () => {
  const { user } = useContext(UserContext);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [eventsByDay, setEventsByDay] = useState({});

  const { data, loading, error } = useQuery(GET_EVENTS, {
    variables: {
      mentorId: user.isMentor ? user.id : null,
      learnerId: !user.isMentor ? user.id : null,
    },
  });
  useEffect(() => {
    if (!loading && !error && data) {
      const events = data?.findEvents || [];
      const eventsByDay = groupEventsByDay(events);
      setEventsByDay(eventsByDay);
    }
  }, [data, loading, error]);

  const statusOptions = [
    { value: "", label: "Filtrar" },
    { value: "PENDING", label: "A Confirmar" },
    { value: "DONE", label: "Realizada" },
    { value: "CONFIRMED", label: "Agendada" },
    { value: "CANCELLED", label: "Cancelada" },
  ];

  const handleFilterChange = (event: any) => {
    setSelectedFilter(event.value);
  };

  let hasMentorship = false;

  if (error)
    return (
      <div className="flex min-h-screen justify-center items-center">
        <p>Ocorreu um erro a carregar a pagina: {error.message}</p>
      </div>
    );

  return (
    <>
      <section className="bg-header-dashboard bg-no-repeat bg-cover">
        <div className="max-w-7xl m-auto flex justify-start">
          {user && (
            <DashboardCardProfile
              job={user.jobTitle}
              name={`${user.firstName} ${user.lastName}`}
              skills={user.skills}
            />
          )}
        </div>
      </section>
      <main className="min-h-screen max-w-7xl m-auto mt-16 p-2 overflow-auto mb-10">
        <div className="flex flex-col md:flex md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4.5xl font-bold dark:text-neutral-01 text-center lg:text-left">
              Todas as suas mentorias
            </h1>
            <p className="text-gray-03 text-center lg:text-left">
              Confira abaixo as mentorias realizadas e que foram marcadas
            </p>
          </div>
          {data?.findEvents?.length > 0 && !loading && (
            <div className="mt-6 md:mt-0">
              <Select
                options={statusOptions}
                unstyled
                classNamePrefix="select"
                placeholder="Filtrar"
                onChange={handleFilterChange}
                classNames={{
                  option: (state) =>
                    `py-2 px-2 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
                  control: (state) =>
                    `bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2 mb-2 sm:min-w-[180px]`,
                  menu: (state) =>
                    `p-4 bg-neutral-01 mt-2 rounded-md border border-gray-03 dark:bg-secondary-01`,
                  multiValue: (state) =>
                    `py-1 px-4 bg-gray-01 text-secondary-03 rounded-full ml-1 mt-1 dark:bg-secondary-01 dark:text-neutral-01`,
                  multiValueRemove: (state) =>
                    `rounded-full hover:text-secondary-01 dark:hover:text-primary-02 ml-1 `,
                }}
              />
            </div>
          )}
        </div>
        <div className="w-full max-w-7xl m-auto max-h-[95vh] overflow-y-scroll overflow-x-hidden py-8 space-y-4 sm:pr-4 mt-4">
          {loading ? (
            <div className="min-h-[45vh] flex justify-center items-center">
              <Spinner />
            </div>
          ) : data?.findEvents?.length > 0 && !loading ? (
            data?.findEvents.map((event: any) => {
              if (selectedFilter === "" || event.status === selectedFilter) {
                hasMentorship = true;

                const mentorInfo = event.participants.find(
                  (participant: any) => participant.user.id === event.mentorId
                )?.user;
                const learnerInfo = event.participants.find(
                  (participant: any) => participant.user.id !== event.mentorId
                )?.user;

                const displayedName = user.isMentor
                  ? `${learnerInfo?.firstName} ${learnerInfo?.lastName}`
                  : `${mentorInfo?.firstName} ${mentorInfo?.lastName}`;

                const displayedJobTitle = user.isMentor
                  ? learnerInfo?.jobTitle
                  : mentorInfo?.jobTitle;
                return (
                  <MentoringLinkCard
                    key={event.id}
                    eventId={event.id}
                    date={formatDate(event.startDate)}
                    hour={formatHour(new Date(event.startDate))}
                    job={displayedJobTitle || "Desenvolvedor"}
                    name={displayedName}
                    status={event.status}
                    meetingLink={event.meetingLink}
                  />
                );
              }
            })
          ) : (
            !hasMentorship &&
            selectedFilter === "" && (
              <p className="text-danger-01">
                Você não possui nenhuma mentoria agendada.
              </p>
            )
          )}
          {!hasMentorship && selectedFilter !== "" && (
            <p className="text-danger-01">
              Não foram encontradas mentorias com o status {selectedFilter}.
            </p>
          )}
        </div>
        <section className="mt-16">
          {data?.findEvents?.length > 0 && !loading && (
            <h2 className="text-secondary-02 text-center md:text-start dark:text-neutral-02 font-bold text-2xl mb-4">
              Mentorias agendadas
            </h2>
          )}
          <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:justify-items-center lg:grid-cols-3 sm:justify-items-start  gap-4">
            {renderMentoringWeekCard(eventsByDay)}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
