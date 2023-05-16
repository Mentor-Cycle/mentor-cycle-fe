import DashboardCardProfile from "@components/DashboardCardProfile";
import Button from "@components/Button/Button";
import Select from "react-select";
import MentoringLinkCard from "@components/MentoringLinkCard";
import Spinner from "@components/Spinner/Spinner";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "services/apollo/queries";
import {
  formatDate,
  formatHour,
  groupEventsByDay,
} from "utils/dashboard-helpers";
import { renderMentoringWeekCard } from "@components/MentoringWeekCard/renderMentoringWeekCards";
import Link from "next/link";
import { useUser } from "@hooks/useUser";

const Dashboard: NextPage = () => {
  const { user } = useUser();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [eventsByDay, setEventsByDay] = useState({});

  const { data, loading, error, refetch } = useQuery(GET_EVENTS, {
    variables: {
      mentorId: user.isMentor ? user.id : null,
      learnerId: !user.isMentor ? user.id : null,
    },
  });
  useEffect(() => {
    refetch();
    if (!loading && !error && data) {
      const events = data?.findEvents || [];
      const filteredEvents = events.filter((mentor: { mentorId: string }) => {
        return (mentor.mentorId !== user.id && !user.isMentor) || user.isMentor;
      });
      const eventsByDay = groupEventsByDay(filteredEvents);
      setEventsByDay(eventsByDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error]);

  const statusOptions = [
    { value: "", label: "Filtrar" },
    { value: "CONFIRMED", label: "Agendada" },
    { value: "CANCELLED", label: "Cancelada" },
  ];

  const handleFilterChange = (event: any) => {
    setSelectedFilter(event.value);
  };

  let hasMentorship = false;

  const generateCards = () => {
    const cards = data?.findEvents.map((event: any) => {
      if (selectedFilter === "" || event.status === selectedFilter) {
        hasMentorship = true;

        const mentorInfo = event.participants.find(
          (participant: any) => participant.user.id === event.mentorId
        )?.user;
        const learnerInfo = event.participants.find(
          (participant: any) => participant.user.id !== event.mentorId
        )?.user;

        if (!user.isMentor && mentorInfo.id === user.id) return;

        const displayedName = user.isMentor
          ? `${learnerInfo?.firstName} ${learnerInfo?.lastName}`
          : `${mentorInfo?.firstName} ${mentorInfo?.lastName}`;

        const displayedJobTitle = user.isMentor
          ? learnerInfo?.jobTitle
          : mentorInfo?.jobTitle;

        const displayedAvatar = user.isMentor
          ? learnerInfo?.photoUrl
          : mentorInfo?.photoUrl;

        return (
          <MentoringLinkCard
            key={event.id}
            onCancel={refetch}
            eventId={event.id}
            avatar={displayedAvatar}
            date={formatDate(event.startDate)}
            hour={formatHour(new Date(event.startDate))}
            job={displayedJobTitle || "Desenvolvedor"}
            name={displayedName}
            status={event.status}
            meetingLink={event.meetingLink}
          />
        );
      }
    });

    if (!!cards.filter(Boolean).length) {
      return cards;
    }

    return generateEmptyFeedback();
  };

  const generateEmptyFeedback = () => {
    if (selectedFilter) return;
    return (
      <div className="min-h-[40vh] flex flex-col justify-center items-center max-w-xs m-auto gap-4">
        <>
          <h3 className="text-secondary-01 font-bold text-center">
            Você não possui nenhuma mentoria agendada.
          </h3>
          {!user.isMentor && (
            <Link href={"/mentors"} className="text-sm" legacyBehavior>
              <Button>Encontre um mentor e agende uma mentoria</Button>
            </Link>
          )}
        </>
      </div>
    );
  };
  return (
    <>
      <section className="bg-header-dashboard min-h-[200px] bg-no-repeat bg-cover flex justify-center items-center">
        <div className="px-2 sm:container flex justify-center sm:justify-start">
          {user && (
            <DashboardCardProfile
              job={user.jobTitle}
              name={`${user.firstName} ${user.lastName}`}
              skills={user.skills}
              avatar={user.photoUrl || "/imgCard.png"}
            />
          )}
        </div>
      </section>
      <main className="min-h-screen px-2 sm:container mt-16 overflow-auto mb-10">
        <div className="flex flex-col md:flex md:flex-row justify-between items-center pr-2">
          <div>
            <h1 className="text-4.5xl font-bold dark:text-neutral-01 text-center lg:text-left">
              Todas as suas mentorias
            </h1>
            <p className="text-gray-03 text-center lg:text-left">
              Confira abaixo as mentorias realizadas e que foram marcadas
            </p>
          </div>
          {data?.findEvents?.length > 0 && !loading && (
            <div className="mt-6 md:mt-0 sm:mr-2">
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
                    `bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2 mb-2 sm:min-w-[173px]`,
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
        <div className="w-full max-h-[95vh] overflow-y-scroll overflow-x-hidden py-8 space-y-4 mt-4 sm:pr-2">
          {loading ? (
            <div className="min-h-[45vh] flex justify-center items-center">
              <Spinner />
            </div>
          ) : data?.findEvents?.length > 0 && !loading ? (
            generateCards()
          ) : (
            !hasMentorship && selectedFilter === "" && generateEmptyFeedback()
          )}
          {!hasMentorship && selectedFilter !== "" && (
            <p className="text-danger-01">
              Não foram encontradas mentorias com o status{" "}
              {
                statusOptions.find((item) => item.value === selectedFilter)
                  ?.label
              }
              .
            </p>
          )}
        </div>
        <section className="mt-16">
          {data?.findEvents?.length > 0 && !loading && (
            <h2 className="text-secondary-02 text-center md:text-start dark:text-neutral-02 font-bold text-2xl mb-4">
              Mentorias agendadas
            </h2>
          )}
          <div
            className="grid justify-items-center grid-cols-1 sm:grid-cols-2 
          md:grid-cols-2 md:justify-items-start lg:grid-cols-3 gap-4"
          >
            {renderMentoringWeekCard(eventsByDay)}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
