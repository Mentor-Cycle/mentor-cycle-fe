import { SlNote } from "react-icons/sl";
import { GiGraduateCap } from "react-icons/gi";
import { RiUserStarLine } from "react-icons/ri";
import CardInstructionSection from "./CardInstructionSection";

const InstructionsSection = () => {
  return (
    <section className="container my-40">
      <h2 className="font-bold text-4.5xl text-center" id="como-funciona">
        Como funciona
      </h2>
      <div className="flex justify-between items-center mt-12">
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
