import Button from "@components/Button";
import Calendar from "@components/Calendar/Calendar";
import Chip from "@components/Chip";
import DashboardCardProfile from "@components/DashboardCardProfile";
import MentoringWeekCard from "@components/MentoringWeekCard/MentoringWeekCard";
import Modal from "@components/Modal";
import Spinner from "@components/Spinner";
import { useMentorProfile } from "@hooks/useMentorProfile";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Stepper from "@components/Stepper/Stepper";
import React from "react";
import { buttonVariant } from "@components/Button/Button.types";

const MentorProfile: NextPage = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { id } = router.query;
  const { mentor, loading, error } = useMentorProfile(id as string);

  const stepButtons: {
    [key: number]: {
      text: string;
      variant: buttonVariant;
    };
  } = {
    1: {
      text: "Continuar",
      variant: "primary",
    },
    2: {
      text: "Confirmar mentoria",
      variant: "primary",
    },
    3: {
      text: "Fechar",
      variant: "secondary",
    },
  };

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

  const handleSteps = () => {
    if (openModal) {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
    } else {
      setCurrentStep(1);
    }
  };

  return (
    <main className="pb-12">
      <div className="py-12 bg-center bg-cover bg-no-repeat bg-[url('/bg-mentor-profile.png')]">
        <div className="flex justify-center sm:justify-start container">
          <DashboardCardProfile
            avatar={"/imgCard.png" || mentor.photoUrl}
            job={mentor.jobTitle || ""}
            name={`${mentor.firstName} ${mentor.lastName}`}
            skills={mentor?.skills || []}
          />
        </div>
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
          <Modal open={openModal} onOpenChange={setOpenModal}>
            <div className="px-16 py-12 flex flex-col justify-center items-center">
              {currentStep === 1 && (
                <>
                  <div className="rounded-lg flex w-full justify-center items-center">
                    <Image
                      src={"/imgCard.png"}
                      alt="avatar profile"
                      width={98}
                      height={98}
                    />
                  </div>
                  <h2 className="text-2xl text-secondary-03 font-semibold mt-10">
                    Mentoria com {mentor.firstName} {mentor.lastName}
                  </h2>
                  <p className="text-base text-gray-05 text-center max-w-md mt-4 mb-10">
                    Escolha um dia para visualizar os horários disponíveis para
                    marcar sua mentoria
                  </p>
                </>
              )}
              <Stepper
                size="small"
                steps={[1, 2, 3]}
                currentStep={currentStep}
              />
              {currentStep === 1 && (
                <>
                  <div className="mt-10">
                    <Calendar availableDays={["oi", "oi"]} />
                  </div>
                  <div className="w-full">
                    <h3 className="mb-6 mt-8">Horários disponíveis</h3>
                    <ul className="grid grid-cols-4 gap-4">
                      {mentor?.availability?.map((availability, index) => {
                        return availability.slots.map((slot, slotIndex) => (
                          <li key={`${index}-${slotIndex}`}>
                            <Chip key={slotIndex} variant="primary">
                              {slot}
                            </Chip>
                          </li>
                        ));
                      })}
                    </ul>
                  </div>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <hr className="text-gray-02 w-full mt-16" />
                  <h2 className="mt-16 font-bold text-2xl">
                    Mentoria de 30 minutos
                  </h2>
                  <p className="mt-6">
                    <span className="font-bold">Horário:</span> 18h até as 18h30
                  </p>
                  <p className="mt-2">
                    <span className="font-bold">Data:</span> Terça-feira 14 de
                    março de 2023
                  </p>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <h2 className="font-bold text-3xl order-[-2]">
                    Mentoria agendada!
                  </h2>
                  <p className="mt-2 mb-16 max-w-sm order-[-1] text-gray-03">
                    Sua mentoria foi agendada no seu calendário e do Ronald
                    Richards
                  </p>
                </>
              )}
              <div className="mt-11 min-w-[183px]">
                <Button
                  size="small"
                  type="button"
                  variant={stepButtons[currentStep].variant}
                  onClick={handleSteps}
                >
                  {stepButtons[currentStep].text}
                </Button>
              </div>
            </div>
          </Modal>
          <Button
            className="mt-12"
            size="regular"
            variant="primary"
            onClick={() => setOpenModal(true)}
          >
            Agendar mentoria
          </Button>
        </section>
      </div>
    </main>
  );
};

export default MentorProfile;
