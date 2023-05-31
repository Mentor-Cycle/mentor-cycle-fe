import { useUser } from "@hooks/useUser";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { TiSocialLinkedinCircular } from "react-icons/ti";

const SocialMediasSection = () => {
  const { user } = useUser();
  const DynamicThemedImage = dynamic(
    () => import("@components/Header/ThemeImage"),
    {
      ssr: false,
    }
  );

  const userIsLogged = user.isLogged ? "/dashboard" : "/";
  return (
    <section>
      <div className="hidden sm:flex justify-start items-center">
        <Link href={userIsLogged}>
          <DynamicThemedImage />
        </Link>
      </div>
      <p className="max-w-[238px] mt-6 text-secondary-02">
        Mentor Cycle - conectando mentes em busca de sucesso.
      </p>
      <div className="flex mt-8 gap-[38px] justify-start items-center">
        <BsDiscord
          size={24}
          className="hover:opacity-70 hover:cursor-pointer"
        />
        <TiSocialLinkedinCircular
          size={30}
          className="hover:opacity-70 hover:cursor-pointer"
        />
      </div>
    </section>
  );
};

export default SocialMediasSection;
