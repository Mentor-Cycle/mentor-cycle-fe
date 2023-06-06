import Button from "@components/Button";
import Image from "next/image";
import Link from "next/link";

const CareerMentorsSection = () => {
  return (
    <section className="bg-secondary-02">
      <div className="xs:container flex flex-col lg:flex-row py-20 gap-[4.625rem]">
        <div className="px-4 xs:px-0 flex justify-center items-center">
          <Image
            alt="mentor-info"
            src={"/mentor-lp.png"}
            width={442}
            height={431}
          />
        </div>
        <div className="px-4 xs:px-0 lg:flex lg:flex-col lg:space-y-8">
          <h2 className="text-2xl text-center lg:text-start lg:text-[2.5rem] leading-[1.0] max-w-[494px] text-neutral-01 m-auto lg:m-0">
            Aumente o crescimento da sua carreira com os melhores mentores
          </h2>
          <p className="px-2 mt-4 mb-12 max-w-[616px] text-gray-01 text-base text-center lg:text-start leading-6 m-auto lg:mb-0">
            Somos uma plataforma que conecta pessoas que já estão no mercado de
            trabalho com quem está iniciando a jornada. Se você procura tirar
            suas dúvidas, ter conselhos, conhecer experiências reais e ter mais
            aprendizado, a Mentor Cycle permite que você agende mentorias e
            tenha todo networking para acelear seu caminho.
          </p>
          <div className="max-w-[328px] m-auto lg:m-0">
            <Link href={"/signin"} className="focus:outline-none" tabIndex={1}>
              <Button>Comece aqui</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerMentorsSection;
