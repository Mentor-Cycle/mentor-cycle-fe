import { useUser } from "@hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { BsDiscord } from "react-icons/bs";
import { TiSocialLinkedinCircular } from "react-icons/ti";

const SocialMediasSection = () => {
  const { user } = useUser();

  const userIsLogged = user.isLogged ? "/dashboard" : "/signin";
  return (
    <section>
      <div className="flex justify-center lg:justify-start items-center">
        <Link href={userIsLogged}>
          <Image alt="Logo" src={"/logoDarkMode.png"} width={55} height={55} />
        </Link>
      </div>
      <p className="lg:max-w-[238px] mt-6 text-neutral-01 text-center lg:text-start">
        Mentor Cycle - conectando mentes em busca de sucesso.
      </p>
      <div className="flex mt-8 gap-[38px] justify-center mb-10 xs:mb-0 lg:justify-start items-center">
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://discord.gg/WRD3uT3JaC"}
        >
          <BsDiscord
            size={24}
            className="hover:opacity-70 hover:cursor-pointer text-neutral-02"
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/company/mentor-cycle/mycompany/"
        >
          <TiSocialLinkedinCircular
            size={30}
            className="hover:opacity-70 hover:cursor-pointer text-neutral-02"
          />
        </a>
      </div>
    </section>
  );
};

export default SocialMediasSection;
