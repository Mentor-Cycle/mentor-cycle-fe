import StepperVertical from "@components/StepperVertical";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen m-auto flex items-center justify-center max-w-lg">
      <StepperVertical />
    </div>
  );
};
export default Home;
