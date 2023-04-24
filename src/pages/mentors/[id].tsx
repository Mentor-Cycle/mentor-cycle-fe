import Button from "@components/Button";
import Chip from "@components/Chip";
import DashboardCardProfile from "@components/DashboardCardProfile";
import MentoringWeekCard from "@components/MentoringWeekCard/MentoringWeekCard";
import Spinner from "@components/Spinner";
import { useMentorProfile } from "@hooks/useMentorProfile";
import { NextPage } from "next";
import { useRouter } from "next/router";

const MentorProfile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { mentor, loading, error } = useMentorProfile(id as string);

  if (loading)
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <Spinner />
        </div>
        ;
      </>
    );
  if (error) {
    router.replace("/404");
    return null;
  }

  return (
    <main className="pb-12">
      <div className="py-12 bg-center bg-cover bg-no-repeat bg-[url('/bg-mentor-profile.png')]">
        <DashboardCardProfile
          avatar={mentor.photoUrl}
          job={mentor.jobTitle || ""}
          name={`${mentor.firstName} ${mentor.lastName}`}
          skills={mentor?.skills || []}
          className="container"
        />
      </div>

      <div className="container flex justify-between flex-wrap pt-8 gap-8">
        <div className="max-w-xl">
          <section>
            <h2 className="text-2xl font-bold leading-normal mb-4">
              Sobre mim
            </h2>
            <p>{mentor.biography}</p>
          </section>
          <section className="mt-12 pb-12 border-secondary-01 border-b border-solid">
            <h2 className="text-2xl font-bold leading-normal mb-4">
              Experiência profissional
            </h2>
            <p>{mentor.biography}</p>
          </section>
          <section className="pt-12 flex flex-wrap gap-y-8">
            <p className="font-bold basis-1/2">{mentor.email}</p>
            <p className="font-bold basis-1/2">{mentor.website}</p>
            <p className="font-bold basis-1/2">{`${mentor.country}, ${mentor.state}`}</p>
            <p className="font-bold basis-1/2">{mentor.yearsOfExperience}</p>
          </section>
        </div>
        <section>
          <h2 className="text-3xl font-bold mb-12">Agenda de mentorias</h2>
          <div className="flex flex-col gap-4">
            {mentor?.availability?.map((availability) => (
              <MentoringWeekCard
                key={availability.weekDay}
                day={availability.weekDay}
                description={""}
                chips={availability.slots.map((slot) => (
                  <Chip key={slot} variant="quartenary">
                    {slot}
                  </Chip>
                ))}
              />
            ))}
          </div>
          <Button className="mt-12" size="regular" variant="primary">
            Agendar mentoria
          </Button>
        </section>
      </div>
    </main>
  );
};

export default MentorProfile;
