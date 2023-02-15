import type { NextPage } from "next";
import { Button } from "@components/Button/Button";
import { MdAccountBox, MdAccountCircle } from "react-icons/md";

const Home: NextPage = () => {
  return (
    <div>
      <main className="flex flex-col items-center py-16 px-0 flex-1 min-h-screen">
        <div className="bg-primary-05 w-screen h-screen p-6 grid grid-cols-2 gap-6 items-center justify-center mt-auto">
          <Button href="/" variant="primary" size="regular">
            Button
          </Button>
          <Button href="/" variant="primarySmall" size="small">
            Button
          </Button>
          <Button href="/" variant="secondarySmall" size="small">
            Button
          </Button>
          <Button href="/" variant="secondarySmall" size="small">
            Button
          </Button>
          <Button
            href="/"
            variant="secondarySmall"
            size="small"
            icon={MdAccountBox}
            disabled
          >
            Button
          </Button>
          <Button
            href="/"
            variant="primary"
            size="small"
            icon={MdAccountCircle}
          >
            Button
          </Button>
          <Button
            href="/"
            variant="primary"
            size="regular"
            icon={MdAccountCircle}
          >
            Button
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
