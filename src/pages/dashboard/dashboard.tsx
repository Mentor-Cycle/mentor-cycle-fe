import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { GET_EVENTS, GET_LOGIN_USER_INFO } from "services/apollo/querys";
import Header from "@components/Header";
import Spinner from "@components/Spinner";
import DashboardCardProfile from "@components/DashboardCardProfile/DashboardCardProfile";
import Chip from "@components/Chip/Chip";
import MentoringLinkCard from "@components/MentoringLinkCard/MentoringLinkCard";
import MentoringWeekCard from "@components/MentoringWeekCard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StatusToVariantMap } from "@components/MentoringLinkCard/MentoringLinkCard.types";
import { UserContext } from "providers/user/AppContext";

interface Mentoring {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  learners: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }[];
}

interface DashboardFilterData {
  firstName: string;
  jobTitle: string;
  skills: string[] | null;
  mentorId: string;
  isMentor: boolean | null;
  status: string[];
  learnerId: string;
  events: Mentoring[];
}

const Dashboard: NextPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [dashboardFilterData, setDashboardFilterData] =
    useState<DashboardFilterData>({
      isMentor: null,
      mentorId: "",
      learnerId: "",
      firstName: "",
      jobTitle: "",
      skills: null,
      status: [],
      events: [],
    });

  const { skills, jobTitle, firstName, mentorId, learnerId, isMentor } =
    dashboardFilterData;

  const {
    data: dataEvents,
    loading: loadingDataEvents,
    error: errorDataEvents,
  } = useQuery(GET_EVENTS, {
    variables: {
      // mentorId: isMentor ? mentorId : null,
      learnerId: !isMentor ? learnerId : null,
    },
  });
  console.log(dashboardFilterData.events.map((event) => event.mentorId));
  useEffect(() => {
    if (user) {
      setDashboardFilterData((prev) => ({
        ...prev,
        isMentor: user.isMentor,
        firstName: user.firstName,
        skills: user.skills,
        jobTitle: user.jobTitle,
        mentorId: user.id,
        learnerId: user.id,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (dataEvents) {
      const events = dataEvents?.findEvents ?? [];

      const uniqueStatuses = events.reduce((acc, curr) => {
        acc.add(curr.status);
        return acc;
      }, new Set<string>());

      setDashboardFilterData((prev) => ({
        ...prev,
        status: [...uniqueStatuses],
        events,
      }));
    }
  }, [dataEvents]);

  const statusToPortugueseMap: Record<string, string> = {
    PENDING: "A confirmar",
    DONE: "Realizada",
    CANCELLED: "Cancelada",
    CONFIRMED: "Confirmada",
  };

  const handleStatusCard = (status: string, key: number) => {
    const statusToVariantMap: StatusToVariantMap = {
      "Não realizada": "primary",
      Realizada: "secondary",
      "A confirmar": "tertiary",
    };
    const variant = statusToVariantMap[statusToPortugueseMap[status]];
    return <Chip variant={variant}>{statusToPortugueseMap[status]}</Chip>;
  };
  if (errorDataEvents) {
    return <p>ocorreu um erro: {errorDataEvents.message}</p>;
  }
  if (loadingDataEvents) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <Spinner size={50} />
      </div>
    );
  }
  return (
    <>
      <section className="bg-header-dashboard bg-no-repeat bg-cover">
        <div className="max-w-7xl m-auto flex justify-start">
          <DashboardCardProfile
            job={jobTitle}
            name={firstName}
            skills={skills}
          />
        </div>
      </section>
      <main className="min-h-screen max-w-7xl m-auto mt-16 p-2 overflow-auto mb-10">
        <div>
          <h1 className="text-4.5xl font-bold dark:text-neutral-01 text-center lg:text-left">
            Todas as suas mentorias
          </h1>
          <p className="text-gray-03 text-center lg:text-left">
            Confira abaixo as mentorias realizadas e que foram marcadas
          </p>
        </div>
        {!dataEvents?.findEvents?.length ? (
          <p className="min-h-screen flex justify-center items-start mt-20 text-center text-primary-02">
            O usuário não possui mentorias agendadas no momento
          </p>
        ) : (
          <div className="w-full max-w-7xl m-auto max-h-[95vh] overflow-y-scroll overflow-x-hidden py-8 space-y-4 pr-4 mt-4">
            {dashboardFilterData.events.map((event, idx) => {
              const startDate = new Date(event.startDate);
              const firstName = event.learners.map(
                (learner) => learner.user.firstName
              );
              return (
                <MentoringLinkCard
                  key={idx}
                  date={format(startDate, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                  hour={`${format(startDate, "HH'h'mm", { locale: ptBR })}`}
                  job="Desenvolvedor Full Stack"
                  name={firstName}
                  status={dashboardFilterData.status}
                  eventId={event.id}
                />
              );
            })}
          </div>
        )}
        {dashboardFilterData.events.length > 0 && (
          <section className="mt-16">
            <h2 className="text-secondary-02 text-center md:text-start dark:text-neutral-02 font-bold text-2xl mb-4">
              Mentorias agendadas
            </h2>
            <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:justify-items-start  gap-4">
              {dashboardFilterData.events.map((event, idx) => {
                return (
                  <MentoringWeekCard
                    key={event.id}
                    day={format(new Date(event.startDate), "EEEE", {
                      locale: ptBR,
                    })}
                    description={`lorem`}
                    chips={[
                      handleStatusCard(event.status, idx),
                      <Chip key={idx + "-hour"} variant="secondary">
                        {`${format(new Date(event.startDate), "HH'h'mm", {
                          locale: ptBR,
                        })}`}
                      </Chip>,
                    ]}
                  />
                );
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
};
export default Dashboard;
