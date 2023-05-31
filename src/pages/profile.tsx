import { NextPage } from "next";
import HeaderLP from "@components/Header/HeaderLP";
import HeroSection from "@components/LandingPage/HeroSection";
import CareerMentorsSection from "@components/LandingPage/CareerMentorsSection";
import InstructionsSection from "@components/LandingPage/InstructionsSection";
import AboutMentorsSection from "@components/LandingPage/AboutMentorsSection";
import FrequentlyAskedQuestionsSection from "@components/LandingPage/FrequentlyAskedQuestionsSection";
import SocialMediasSection from "@components/LandingPage/Footer/SocialMediasSection";
import About from "@components/LandingPage/Footer/About";
import Contact from "@components/LandingPage/Footer/Contact";
import FAQ from "@components/LandingPage/Footer/FAQ";

const Profile: NextPage = () => {
  return (
    <>
      <HeaderLP />
      <main>
        <HeroSection />
        <CareerMentorsSection />
        <InstructionsSection />
        <AboutMentorsSection />
        <FrequentlyAskedQuestionsSection />
      </main>
      <footer className="bg-neutral-01 dark:bg-secondary-05 pb-10">
        <div className="container">
          <div className="flex py-10 justify-between max-w-[965px]">
            <SocialMediasSection />
            <About />
            <Contact />
          </div>
          <div className="flex justify-between mt-20">
            <span className="font-semibold">Copyright 2023</span>
            <FAQ />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Profile;
