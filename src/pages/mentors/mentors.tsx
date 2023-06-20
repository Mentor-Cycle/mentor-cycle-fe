import CardProfile from "@components/CardProfile";
import Input from "@components/Input/Input";
import SelectSkills from "@components/MultiSelect/SelectSkills";
import TimeSelect from "@components/MultiSelect/TimeSelect";
import Spinner from "@components/Spinner";
import { useTypedQuery } from "@hooks/useTypedQuery";
import { useUser } from "@hooks/useUser";
import { NextPage } from "next";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IMentorClient } from "schemas/mentor";
import { TGET_MENTORS_filterSchema as TVariables } from "services/apollo/queries/queries-properties";
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import { useDebounce } from "use-debounce";
import { formatMentorCardData } from "utils/utilsMentorPage";

const PAGE_SIZE = 9;

export type Filter = Omit<TVariables, "limit" | "take"> & {
  lastName: string;
  mentors: IMentorClient[];
};

const mentorsInitialState: Filter = {
  firstName: "",
  lastName: "",
  orderBy: "firstName",
  order: "asc",
  skip: 0,
  pageSize: PAGE_SIZE,
  pageNumber: 1,
  period: null,
  skills: null,
  mentors: [],
};

const Mentors: NextPage = () => {
  const [filter, setFilter] = useState<Filter>(mentorsInitialState);

  const {
    orderBy,
    order,
    skip,
    pageSize,
    pageNumber,
    period,
    skills,
    mentors,
    firstName,
  } = filter;

  const [debouncedSearchInput] = useDebounce(firstName, 1000);
  const { user } = useUser();

  const {
    error: errorMentor,
    loading: loadingMentor,
    refetch: refetchMentor,
  } = useTypedQuery(api.GET_MENTORS, {
    variables: {
      firstName: debouncedSearchInput,
      skills,
      orderBy,
      order,
      skip,
      pageSize,
      pageNumber,
      period,
    },
    onCompleted: (response) => {
      const mentors = formatMentorCardData(response.findMentors);
      setFilter((prevFilter) => ({
        ...prevFilter,
        mentors,
      }));
    },
  });
  if (errorMentor?.error) console.log("errorMentor", errorMentor);

  useEffect(() => {
    refetchMentor({
      firstName: debouncedSearchInput,
      skills,
      skip,
      pageSize,
      pageNumber,
      period,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      firstName: e.target.value,
    }));
  }, []);

  const handleSkillsChange = useCallback(
    (selectedSkills: TVariables["skills"]) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        skills: selectedSkills,
      }));
    },
    []
  );

  const handlePeriodChange = useCallback((selectedPeriod: Filter["period"]) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      period: selectedPeriod,
    }));
  }, []);
  const handleLoadMore = useCallback(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      pageSize: prevFilter.pageSize + 9,
    }));
  }, []);

  if (errorMentor) {
    console.error(errorMentor);
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Aconteceu um erro. Tente novamente.</p>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen xs:container m-auto mt-16 p-2 overflow-auto mb-5">
        <div>
          <h1 className="text-4.5xl font-bold text-secondary-02 dark:text-neutral-01 text-center lg:text-left">
            Mentores
          </h1>
          <p className="text-gray-03 text-center lg:text-left">
            Os melhores mentores, com as melhores didáticas
          </p>
        </div>
        <div className="flex flex-col lg:flex lg:flex-row justify-between items-center mt-10">
          <div className="w-full max-w-[550px] 2xl:max-w-2xl">
            <Input
              name="findMentors"
              placeholder="Ronald Richards"
              onChange={handleSearchChange}
              search={true}
            />
          </div>
          <div className="flex flex-col sm:flex sm:flex-row justify-end gap-4 sm:gap-8">
            <SelectSkills
              placeholder="Especialidade"
              setSelectedSkills={handleSkillsChange}
            />
            <TimeSelect
              setSelectedTime={handlePeriodChange}
              placeholder="Horários"
            />
          </div>
        </div>
        {loadingMentor && mentors.length === 0 ? (
          <div className="min-h-screen flex justify-center items-center">
            <Spinner size={50} />
          </div>
        ) : (
          <div>
            <InfiniteScroll
              dataLength={mentors.length}
              loader={<Spinner size={50} />}
              next={handleLoadMore}
              hasMore={mentors.length >= pageSize}
              className="min-h-screen overflow-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-auto items-center sm:items-start justify-center sm:justify-between gap-4 mt-8 justify-items-center"
            >
              {mentors.length > 0 ? (
                mentors.map((mentor, index) => (
                  <CardProfile
                    id={mentor.id}
                    key={index}
                    chips={mentor.chips}
                    description={mentor.description}
                    image={mentor.image}
                    jobTitle={user.jobTitle || (mentor.jobTitle ?? "")}
                    location={mentor.location}
                    name={mentor.firstName}
                    lastName={mentor.lastName ?? ""}
                    isCurrentMentor={user.isLogged && user.id === mentor.id}
                  />
                ))
              ) : (
                <p className="text-gray-03 text-center mt-8 w-full col-start-2">
                  Nenhum mentor encontrado
                </p>
              )}
            </InfiniteScroll>
          </div>
        )}
      </main>
    </>
  );
};

export default Mentors;
