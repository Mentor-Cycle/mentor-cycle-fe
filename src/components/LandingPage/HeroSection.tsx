import Button from "@components/Button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="flex items-center container py-20 pt-[100px]"
      id="inicio"
    >
      <div>
        <h1 className="text-[64px] leading-[1] max-w-[450px]">
          Comece seu aprendizado por aqui!
        </h1>
        <p className="text-gray-04 mt-6 mb-[40px]">
          Tire suas dúvidas de forma rápida, prática e gratuita. Construa seu
          futuro sem dúvidas.
        </p>
        <div className="max-w-[328px]">
          <Link href={"/"}>
            <Button>Procurar mentor</Button>
          </Link>
        </div>
      </div>
      <div className="bg-hero-section-lp bg-no-repeat bg-contain min-h-[556px] w-full" />
    </section>
  );
};

export default HeroSection;
