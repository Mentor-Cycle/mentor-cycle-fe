import type { NextPage } from "next";
import Image from "next/image";
import logo from "../public/logo-white.svg";
import notion from "../public/notion.svg";
import linkedin from "../public/linkedin.svg";

const Home: NextPage = () => {
  return (
    <main
      className="w-full h-screen bg-gradient-to-r from-[#212324] to-[#DE032A]
    "
    >
      <article
        className=" max-w-sm mx-auto w-full h-screen flex flex-col items-center justify-center 
    "
      >
        <Image src={logo} width={300} height={300} alt="Mentor Cycle Logo" />
        <h1 className="text-colors-neutral-01 text-5xl font-normal mt-16">
          Em Breve
        </h1>
        <section className="max-w-xs">
          <p className="mt-10 text-colors-neutral-01 text-base">
            Tire suas dúvidas de forma rápida e prática. Construa seu futuro sem
            dúvidas.
          </p>
          <p className="mt-12 text-colors-neutral-01 text-base">
            Conheça melhor o projeto em nossas redes:
          </p>
        </section>

        <section className="mt-10 w-40 flex justify-between items-center">
          <a
            href="https://www.linkedin.com/company/mentor-cycle/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={linkedin}
              width={30}
              height={30}
              alt="Linkedin Mentor Cycle"
            />
          </a>
          <a
            href="https://uxdavidareal.notion.site/Mentor-Cycle-ff5e6e73778d40d690d57aeac24d8cb5"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={notion}
              width={30}
              height={30}
              alt="Notion Mentor Cycle"
            />
          </a>
        </section>
        <a
          href="https://www.figma.com/file/KnsardnDQ2lDKUYo58G8Pf/Mentor-Cycle?node-id=240%3A197&t=yyUDX06BedyrhAgE-1"
          target="_blank"
          rel="noreferrer"
        >
          <button className="mt-10 py-3 px-10 rounded-lg text-colors-neutral-02 bg-colors-secondary-03 font-bold text-xl">
            Veja o esboço inicial do projeto
          </button>
        </a>
      </article>
    </main>
  );
};

export default Home;
