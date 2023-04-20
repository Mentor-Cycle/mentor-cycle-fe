import { useQuery } from "@apollo/client";
import Spinner from "@components/Spinner";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_MENTOR_BY_ID } from "services/apollo/querys";

const MentorProfile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_MENTOR_BY_ID, {
    variables: { id },
  });

  const [mentor, setMentor] = useState({
    id: "",
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    skills: [],
    description: "",
    availability: [],
  });

  useEffect(() => {
    if (data) {
      setMentor(data.findOneMentor);
    }
  }, [data]);
  if (loading)
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <Spinner />
        </div>
        ;
      </>
    );
  if (error) return <p>Erro ao carregar o perfil do mentor</p>;
  if (!mentor.firstName || !mentor.lastName)
    return <p>Mentor não encontrado</p>;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="bg-primary-02 p-4 rounded-lg text-2xl text-neutral-03">
          Perfil do Mentor: {mentor.firstName} {mentor.lastName}
        </h1>
      </div>
    </>
  );
};

export default MentorProfile;
