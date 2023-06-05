import { useQuery } from "@apollo/client";
import Button from "@components/Button";
import DashboardCardProfile from "@components/DashboardCardProfile";
import { noEventsMessage } from "@components/EmptyValues/noEventMessage";
import validateEmptyComponent, {
  ActionMeta,
  SingleValue,
} from "@components/EmptyValues/validateEmptyComponent";
import { InfoPopUp } from "@components/InfoPopUp";
import MentoringLinkCard from "@components/MentoringLinkCard";
import { renderMentoringWeekCard } from "@components/MentoringWeekCard/renderMentoringWeekCards";
import ProfileCompletionAlert from "@components/ProfileCompletionAlert/ProfileCompletionAlert";
import { useUser } from "@hooks/useUser";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import { GET_EVENTS } from "services/apollo/queries";
import {
  formatDate,
  formatHour,
  groupEventsByDay,
  filterByUniqueEvents,
} from "utils/dashboard-helpers";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import { IGroupEventsByDay, IStatusOption } from "types/dashboard.types";
import { OptionStatus, eventStatusSchema } from "schemas/create_event_output";
import { z } from "zod";

const Dashboard: NextPage = () => {
  const statusOptions: IStatusOption[] = [
    { value: "", label: "Todas" },
    { value: "DONE", label: "Realizada" },
    { value: "CONFIRMED", label: "Agendada" },
    { value: "CANCELLED", label: "Cancelada" },
  ];

  const router = useRouter();
  const { user } = useUser();
  const [selectedFilter, setSelectedFilter] = useState<OptionStatus | "">(
    statusOptions[2].value
  );
  const [eventsByDay, setEventsByDay] = useState<IGroupEventsByDay>({});

  const {
    data: events,
    loading: loadingEvents,
    error: errorEvents,
    refetch: refetchEvents,
  } = useTypedQuery(api.GET_EVENTS, {
    variables: {
      learnerId: !user.isMentor ? user.id : null,
      mentorId: user.isMentor ? user.id : null,
    },
  });
  if (errorEvents?.error) console.log("errorEvents", errorEvents);

  console.log("data? ", data);

  useEffect(() => {
    refetchEvents();
    if (!loadingEvents && !errorEvents && events) {
      const foundEvents = events.findEvents;
      const filteredEvents = foundEvents.filter((mentor) => {
        return user.isMentor || (mentor.mentorId !== user.id && !user.isMentor);
      });

      const eventsByDay = groupEventsByDay(filteredEvents);

      // This removes duplicated records on output
      // Maybe this function is not necessary since data is now validated
      // on input. If that's the case, remove it.
      const uniqueEventsByDay = filterByUniqueEvents(eventsByDay);

      setEventsByDay(uniqueEventsByDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, loadingEvents, errorEvents]);

  const handleFilterChange = (newValue: SingleValue<IStatusOption>) => {
    const eventValueParse = eventStatusSchema
      .or(z.literal(""))
      .safeParse(newValue?.value);
    if (!eventValueParse.success) return;
    const newSelectedFilter = eventValueParse.data;
    setSelectedFilter(newSelectedFilter);
  };

  const generateCards = () => {
    const hasSelectedFilter =
      events?.findEvents?.some((event) => event.status === selectedFilter) ??
      false;
    if (events?.findEvents && !hasSelectedFilter && selectedFilter) {
      return noEventsMessage({ selectedFilter, statusOptions });
    }
    const cards = events?.findEvents.map((event) => {
      if (selectedFilter === "" || event.status === selectedFilter) {
        const mentorInfo = event.participants.find(
          (participant) => participant.user.id === event.mentorId
        )?.user;
        const learnerInfo = event.participants.find(
          (participant) => participant.user.id !== event.mentorId
        )?.user;

        if (!user.isMentor && mentorInfo?.id === user.id) return;

        const displayedName = user.isMentor
          ? `${learnerInfo?.firstName} ${learnerInfo?.lastName}`
          : `${mentorInfo?.firstName} ${mentorInfo?.lastName}`;

        const displayedJobTitle = user.isMentor
          ? learnerInfo?.jobTitle
          : mentorInfo?.jobTitle;

        const displayedAvatarUrl = user.isMentor
          ? learnerInfo?.photoUrl
          : mentorInfo?.photoUrl;

        return (
          <MentoringLinkCard
            key={event.id}
            avatarUrl={displayedAvatarUrl}
            name={displayedName}
            job={displayedJobTitle || "Desenvolvedor"}
            date={formatDate(event.startDate)}
            hour={formatHour(new Date(event.startDate))}
            status={event.status}
            meetingLink={event.meetingLink}
            eventId={event.id}
            onCancel={refetchEvents}
          />
        );
      }
    });

    const hasValidCards = cards && !!cards.filter(Boolean).length;

    if (hasValidCards) {
      return cards;
    }
  };

  if (loadingEvents)
    return (
      <div className="min-h-screen flex justify-center items-center">
        {/* <Spinner /> */}
      </div>
    );
  return (
    <>
      <header>
        <section className="bg-header-dashboard min-h-[200px] bg-no-repeat bg-cover flex justify-center items-center">
          <div className="flex justify-start  container ">
            <DashboardCardProfile
              avatarUrl={user.photoUrl || "/imgCard.png"}
              job={user.jobTitle || ""}
              name={`${user.firstName} ${user.lastName}`}
              skills={user?.skills || []}
            />
          </div>
        </section>
      </header>
      <main className="px-2 sm:container mt-12 overflow-auto mb-10">
        {user.isMentor && (!user.availability || !user.availability.length) && (
          <InfoPopUp
            description="Cadastre sua disponibilidade para começar a mentorar"
            buttonName="Criar Agenda"
            variant="primary_black"
            onButtonClick={() => {
              router.push("/profile?availability=true");
            }}
          />
        )}
        <ProfileCompletionAlert />
        {
          <div className="flex flex-col md:flex md:flex-row justify-between items-center ">
            <div>
              <h1 className="text-4.5xl font-bold text-secondary-02 dark:text-neutral-01 text-center lg:text-left">
                Todas as suas mentorias
              </h1>
              <p className="text-gray-03 text-center lg:text-left">
                {validateEmptyComponent({
                  selectedFilter,
                  statusOptions,
                  data: events,
                  user,
                })}
              </p>
            </div>
            <div className="mt-6 md:mt-0 sm:mr-2">
              <Select
                options={statusOptions}
                defaultValue={statusOptions[2]}
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
          </div>
        }
        <div
          className={
            "max-h-[70vh] w-full  overflow-x-hidden  space-y-4 mt-4 sm:pr-2"
          }
        >
          {events && events.findEvents.length > 0 && generateCards()}
        </div>
        <section className="mt-16">
          <h2 className="text-secondary-02 text-center md:text-start dark:text-neutral-02 font-bold text-2xl mb-2">
            Mentorias agendadas
          </h2>
          {events && events.findEvents.length > 0 ? (
            <>
              <div
                className="grid justify-items-start grid-cols-1 sm:grid-cols-2 
        md:grid-cols-2 md:justify-items-start lg:grid-cols-3 gap-4"
              >
                {renderMentoringWeekCard(eventsByDay)}
              </div>
            </>
          ) : (
            <div className="flex flex-col lg:flex-row">
              <div className="w-full">
                <p className="text-gray-02 text-base text-center md:text-start mt-2 sm:mt-0">
                  Você ainda não possui mentorias semanais realizadas e marcadas
                </p>
              </div>
              <div className="flex items-center justify-center sm:justify-start lg:justify-end lg:items-end w-full min-h-[20vh] ">
                <div className="max-w-xs w-full">
                  {!user?.isMentor && (
                    <Link href={"/mentors"} className="w-full">
                      <Button size="small">Encontrar uma mentoria</Button>
                    </Link>
                  )}
                  {user?.isMentor && !user?.availability && (
                    <Link href={"/profile"} className="w-full">
                      <Button size="small">Criar uma agenda</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Dashboard;
