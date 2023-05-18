import { useQuery } from "@apollo/client";
import CardProfile from "@components/CardProfile";
import Input from "@components/Input/Input";
import SelectSkills from "@components/MultiSelect/SelectSkills";
import TimeSelect from "@components/MultiSelect/TimeSelect";
import Spinner from "@components/Spinner";
import { useUser } from "@hooks/useUser";
import { NextPage } from "next";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GET_MENTORS } from "services/apollo/queries";
import { useDebounce } from "use-debounce";
import { formatMentorCardData } from "utils/utilsMentorPage";

const PAGE_SIZE = 9;

interface Filter {
  firstName: string;
  lastName: string;
  orderBy: string;
  order: string;
  skip: number;
  pageSize: number;
  pageNumber: number;
  period: null | string;
  skills: string | null;
  mentors: [];
}

const Mentors: NextPage = () => {
  const [filter, setFilter] = useState<Filter>({
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
  });

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

  const { data, error, loading, refetch } = useQuery(GET_MENTORS, {
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
  });

  useEffect(() => {
    if (data) {
      const mentors = formatMentorCardData(data.findMentors);
      setFilter((prev) => ({
        ...prev,
        mentors: mentors,
      }));
    }
  }, [data]);

  useEffect(() => {
    refetch({
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

  const handleSkillsChange = useCallback((selectedSkills: string | null) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      skills: selectedSkills,
    }));
  }, []);

  const handlePeriodChange = useCallback((selectedPeriod: string | null) => {
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

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>{error.message}</p>
      </div>
    );

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
          <div className="w-full max-w-xl 2xl:max-w-2xl">
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
        {loading && mentors.length === 0 ? (
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
                mentors.map(
                  (
                    {
                      chips,
                      id,
                      image,
                      description,
                      jobTitle,
                      location,
                      firstName,
                      lastName,
                    },
                    index
                  ) => (
                    <CardProfile
                      id={id}
                      key={index}
                      chips={chips}
                      description={description}
                      image={image}
                      jobTitle={user.jobtitle || jobTitle}
                      location={location}
                      name={firstName}
                      lastName={lastName}
                      isCurrentMentor={user.isLogged && user.id === id}
                    />
                  )
                )
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
