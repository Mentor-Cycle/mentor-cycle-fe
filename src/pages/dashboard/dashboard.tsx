import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
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

interface Filter {
  firstName: string;
  jobTitle: string;
  skills: string[] | null;
  idUser: string;
  status: string;
  events: Mentoring[];
}

const Dashboard: NextPage = () => {
  const [filter, setFilter] = useState<Filter>({
    idUser: "",
    firstName: "",
    jobTitle: "",
    skills: null,
    status: "",
    events: [],
  });

  const { skills, jobTitle, firstName, idUser } = filter;
  const {
    data: userInfo,
    loading: loadingUserInfo,
    error: errorUserInfo,
  } = useQuery(GET_LOGIN_USER_INFO);
  const {
    data: dataEvents,
    loading: loadingDataEvents,
    error: errorDataEvents,
  } = useQuery(GET_EVENTS, {
    variables: {
      mentorId: idUser,
    },
  });

  useEffect(() => {
    if (userInfo) {
      setFilter((prev) => ({
        ...prev,
        firstName: userInfo.me.firstName,
        skills: userInfo.me.skills,
        jobTitle: userInfo.me.jobTitle,
        idUser: userInfo.me.id,
      }));
    }
  }, [userInfo]);

  useEffect(() => {
    if (dataEvents) {
      setFilter((prev) => ({
        ...prev,
        status: dataEvents?.findEvents[0]?.status,
        events: dataEvents?.findEvents,
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

  if (errorUserInfo || errorDataEvents) {
    return <p>ocorreu um erro: {(userInfo || errorDataEvents).message}</p>;
  }

  if (loadingUserInfo || loadingDataEvents) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        {" "}
        <Spinner size={50} />
      </div>
    );
  }
  return (
    <>
      <Header isLogged={true} userName="Tonon" />
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
            OConfira abaixo as mentorias realizadas e que foram marcadas
          </p>
        </div>
        <div className="w-full max-w-7xl m-auto max-h-[95vh] overflow-y-scroll overflow-x-hidden py-8 space-y-4 pr-4 mt-4">
          {filter.events.map((event, idx) => {
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
                status={filter.status}
                eventId={event.id}
              />
            );
          })}
        </div>
        {filter.events.length > 0 && (
          <section className="mt-16">
            <h2 className="text-secondary-02 dark:text-neutral-02 font-bold text-2xl">
              Mentorias agendadas
            </h2>
            <div className="flex space-x-4 mt-4">
              {filter.events.map((event, idx) => {
                return (
                  <MentoringWeekCard
                    key={event.id}
                    day={format(new Date(event.startDate), "eeee", {
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
