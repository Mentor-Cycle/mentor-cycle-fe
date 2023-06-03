import { NextPage } from "next";
import HeaderLP from "@components/LandingPage/Header/HeaderLP";
import HeroSection from "@components/LandingPage/HeroSection";
import CareerMentorsSection from "@components/LandingPage/CareerMentorsSection";
import InstructionsSection from "@components/LandingPage/InstructionsSection";
import AboutMentorsSection from "@components/LandingPage/AboutMentorsSection";
import FrequentlyAskedQuestionsSection from "@components/LandingPage/FrequentlyAskedQuestionsSection";
import SocialMediasSection from "@components/LandingPage/Footer/SocialMediasSection";
import About from "@components/LandingPage/Footer/About";
import Contact from "@components/LandingPage/Footer/Contact";
import FAQ from "@components/LandingPage/Footer/FAQ";
import PartnershipsSection from "@components/LandingPage/PartnershipsSection";

const LandingPage: NextPage = () => {
  return (
    <>
      <HeaderLP />
      <main className="bg-secondary-03 pt-[84px]">
        <HeroSection />
        <CareerMentorsSection />
        <InstructionsSection />
        <AboutMentorsSection />
        <FrequentlyAskedQuestionsSection />
        <PartnershipsSection />
      </main>
      <footer className="bg-secondary-05 pb-10">
        <div className="px-2 xs:container">
          <div className="flex flex-col lg:flex-row py-10 justify-between max-w-[965px]">
            <SocialMediasSection />
            <About />
            <Contact />
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between mt-20">
            <span className="font-semibold text-neutral-01 py-4 xs:py-0">
              Copyright 2023
            </span>
            <FAQ />
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
