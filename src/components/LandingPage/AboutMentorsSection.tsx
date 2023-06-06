import Button from "@components/Button";
import Image from "next/image";
import Link from "next/link";

const AboutMentorsSection = () => {
  return (
    <section className="bg-secondary-02 py-[70px] px-2 sm:px-0" id="mentores">
      <div className="xs:container flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col ">
          <h3 className="text-gray-01 text-xl font-bold text-center lg:text-start">
            SOBRE NOSSOS MENTORES
          </h3>
          <h2 className="text-center lg:text-start text-2xl xs:text-[2rem] font-bold sm:max-w-[294px] leading-[1.0] mt-6 text-neutral-01 m-auto lg:m-0 lg:py-4">
            Conheça todos os nossos mentores
          </h2>
          <p className="max-w-[365px] mt-4 text-gray-01 text-center lg:text-start px-4 xs:px-0 m-auto">
            Profissionais incríveis com experiênciais reais de mercado para
            compartilhar com você. Converse com mentores da área da tecnologia e
            prepare-se para os desafios.
          </p>
          <div className="mt-12  max-w-[220px] m-auto lg:m-0 lg:py-12 w-full">
            <Link href={"/signin"} className="focus:outline-none" tabIndex={1}>
              <Button size="small">Saiba mais</Button>
            </Link>
          </div>
        </div>
        <div className="mt-10 lg:m-0 px-4 xs:px-0 max-w-[500px] 2xl:max-w-max">
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
