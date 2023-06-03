import Button from "@components/Button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="flex items-center justify-center lg:justify-start container py-40 pt-[100px]"
      id="inicio"
    >
      <div>
        <h1 className="text-4xl text-center lg:text-start lg:text-[48px] 2xl:text-[64px] leading-[1] max-w-[450px] text-neutral-01 m-auto">
          Comece seu aprendizado por aqui!
        </h1>
        <p className="text-gray-01 mt-6 mb-[100px] xs:mb-[40px] text-base text-center lg:text-start max-w-[550px]">
          Tire suas dúvidas de forma rápida, prática e gratuita. Construa seu
          futuro sem dúvidas.
        </p>
        <div className="max-w-[328px] m-auto lg:m-0 ">
          <Link href={"/signin"} className="focus:outline-none" tabIndex={1}>
            <Button>Procurar mentor</Button>
          </Link>
        </div>
      </div>
      <div className="bg-hero-section-lp bg-no-repeat bg-contain bg-right min-h-[356px] 2xl:min-h-[556px] w-full hidden lg:flex" />
    </section>
  );
};

export default HeroSection;
