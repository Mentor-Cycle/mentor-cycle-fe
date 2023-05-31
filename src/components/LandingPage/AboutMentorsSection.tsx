import Button from "@components/Button";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const AboutMentorsSection = (props: Props) => {
  return (
    <section
      className="bg-gray-01 dark:bg-secondary-02 py-[70px]"
      id="mentores"
    >
      <div className="container flex justify-between items-center">
        <div>
          <h3 className="text-gray-04 dark:text-gray-01 text-xl font-bold">
            SOBRE NOSSOS MENTORES
          </h3>
          <h2 className="text-[2rem] font-bold max-w-[294px] leading-[1.0] mt-6">
            Conheça todos os nossos mentores
          </h2>
          <p className="max-w-[365px] mt-4 text-gray-04">
            Profissionais incríveis com experiênciais reais de mercado para
            compartilhar com você. Converse com mentores da área da tecnologia e
            prepare-se para os desafios.
          </p>
          <div className="mt-12  max-w-[220px]">
            <Link href={"/"}>
              <Button size="small">Saiba mais</Button>
            </Link>
          </div>
        </div>
        <div>
          <Image
            alt="mentor learning"
            src={"/mentor-learning.png"}
            width={647}
            height={460}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMentorsSection;
