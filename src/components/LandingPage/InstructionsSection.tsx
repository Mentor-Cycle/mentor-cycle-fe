import { SlNote } from "react-icons/sl";
import { GiGraduateCap } from "react-icons/gi";
import { RiUserStarLine } from "react-icons/ri";
import CardInstructionSection from "./CardInstructionSection";

const InstructionsSection = () => {
  return (
    <section className="container py-20 xs:py-40">
      <h2
        className="font-bold  text-2xl text-center md:text-4.5xl text-neutral-01"
        id="como-funciona"
      >
        Como funciona
      </h2>
      <div className="flex flex-col 2xl:flex-row justify-between items-center mt-12 gap-4 2xl:gap-0">
        <CardInstructionSection
          text="Faça seu cadastro hoje mesmo e de forma gratuita"
          title="Cadastre"
          icon={SlNote}
        />
        <CardInstructionSection
          text="Encontre seu mentor e agende uma mentoria"
          title="Procure"
          icon={GiGraduateCap}
        />
        <CardInstructionSection
          text="Eleve sua carreira para outro nível com profissionais reais"
          title="Evolua"
          icon={RiUserStarLine}
        />
      </div>
    </section>
  );
};

export default InstructionsSection;
