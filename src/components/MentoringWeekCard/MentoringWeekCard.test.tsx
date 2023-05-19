import Chip from "@components/Chip/Chip";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import MentoringWeekCard from "./MentoringWeekCard";
import { Props } from "./MentoringWeekCard.types";

describe("MentoringWeekCard", () => {
  const props: Props = {
    day: "Segunda-feira",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet.",
    chips: [
      <Chip variant="primary" key="1">
        teste
      </Chip>,
    ],
  };

  it("renders day, hour, and status", () => {
    const { getByText } = render(<MentoringWeekCard {...props} />);
    const chip = getByText("teste");
    expect(screen.getByText(props.day)).toBeInTheDocument();
    expect(chip).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });
});
