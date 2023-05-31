import Button from "@components/Button";
import Image from "next/image";
import Link from "next/link";

const CareerMentorsSection = () => {
  return (
    <section className="bg-gray-01 dark:bg-secondary-02">
      <div className="container flex py-20 gap-[4.625rem]">
        <div>
          <Image
            alt="mentor-info"
            src={"/mentor-lp.png"}
            width={442}
            height={431}
          />
        </div>
        <div>
          <h2 className="text-[2.5rem] leading-[1.0] max-w-[494px]">
            Aumente o crescimento da sua carreira com os melhores mentores
          </h2>
          <p className="mt-4 mb-12 max-w-[616px] text-gray-04">
            Somos uma plataforma que conecta pessoas que já estão no mercado de
            trabalho com quem está iniciando a jornada. Se você procura tirar
            suas dúvidas, ter conselhos, conhecer experiências reais e ter mais
            aprendizado, a Mentor Cycle permite que você agende mentorias e
            tenha todo networking para acelear seu caminho.
          </p>
          <div className="max-w-[328px]">
            <Link href={"/"}>
              <Button>Comece aqui</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerMentorsSection;
