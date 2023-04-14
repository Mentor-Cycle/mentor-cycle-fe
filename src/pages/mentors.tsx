import { NextPage } from "next";
import Header from "@components/Header";
import Input from "@components/Input";
import CardProfile from "@components/CardProfile";
import imgCard from "../public/imgCard.png";
import Select from "react-select";
import React, { ChangeEvent, FormEvent } from "react";
import { useQuery } from "@apollo/client";
import { GET_MENTORS } from "services/apollo/querys";

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const Mentors: NextPage = () => {
  const mockCardProfile = {
    name: "John Doe",
    jobTitle: "Software Engineer",
    location: "New York, NY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada bibendum ligula, vel tincidunt enim. ",
    chips: [
      { variant: "quartenary", children: "Backend" },
      { variant: "quartenary", children: "FrontEnd" },
      { variant: "quartenary", children: "FullStack" },
    ],
    image: imgCard,
  };

  const { data, error, loading } = useQuery(GET_MENTORS);
  const mentorsData =
    data?.findMentors?.map((mentor) => {
      return {
        ...mentor,
        chips: mockCardProfile.chips,
        image: imgCard,
        jobTitle: "Software Engineer",
        location: `${mentor.country} ${mentor.state}`,
        description: mentor.description,
      };
    }) || [];
  console.log(mentorsData);

  return (
    <>
      <Header isLogged={true} userName="Tonon" />
      <main className="min-h-screen max-w-6xl m-auto mt-16">
        <div>
          <h1 className="text-4.5xl font-bold dark:text-neutral-01">
            Mentores
          </h1>
          <p className="text-gray-03">
            Os melhores mentores, com as melhores didáticas
          </p>
        </div>
        <div className="flex justify-between items-center gap-4 mt-10">
          <div className="w-full max-w-2xl">
            <Input
              name="findMentors"
              placeholder="Ronald Richards"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end gap-8">
            <SelectComponent
              placeholder="Especialização"
              options={optionsSkills}
            />
            <SelectComponent placeholder="Horários" options={optionsTimes} />
          </div>
        </div>
        {loading ? (
          <p>${error?.message}</p>
        ) : (
          <div className="grid grid-cols-1 mx-auto sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
            {mentorsData.map((card, index) => (
              <CardProfile
                key={index}
                {...card}
                name={card.firstName}
                chips={mockCardProfile.chips}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Mentors;

const optionsSkills = [
  { value: "backend", label: "Backend" },
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Fullstack" },
];

const optionsTimes = [
  { value: "manha", label: "Manhã" },
  { value: "tarde", label: "Tarde" },
  { value: "noite", label: "Noite" },
];

const SelectComponent = ({ placeholder, options }: any) => (
  <Select
    placeholder={placeholder}
    options={options}
    unstyled
    classNames={{
      option: (state) =>
        `py-2 px-2 rounded-md cursor-pointer text-gray-05 hover:bg-primary-01 hover:text-neutral-01 dark:text-neutral-05 dark:hover:text-neutral-01 dark:hover:bg-primary-02`,
      control: (state) =>
        `bg-neutral-03 hover:bg-neutral-01 hover:cursor-pointer rounded-md py-4 px-6 dark:bg-secondary-03 dark:text-neutral-01 border border-gray-03 mt-2`,
      menu: (state) =>
        `p-4 bg-neutral-01 mt-2 rounded-md border border-gray-03 dark:bg-secondary-01`,
      multiValue: (state) =>
        `py-1 px-4 bg-gray-01 text-secondary-03 rounded-full ml-1 mt-1 dark:bg-secondary-01 dark:text-neutral-01`,
      multiValueRemove: (state) =>
        `rounded-full hover:text-secondary-01 dark:hover:text-primary-02 ml-1 `,
    }}
  />
);
