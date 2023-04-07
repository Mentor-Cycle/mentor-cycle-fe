import React from "react";
import { render, screen } from "@testing-library/react";
import MentoringWeekCard from "./MentoringWeekCard";
import { Props } from "./MentoringWeekCard.types";
import "@testing-library/jest-dom/extend-expect";

describe("MentoringWeekCard", () => {
  const props: Props = {
    day: "Segunda-feira",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet.",
    hour: "19h30",
    status: "A confirmar",
  };

  it("renders day, hour, and status", () => {
    render(<MentoringWeekCard {...props} />);
    expect(screen.getByText(props.day)).toBeInTheDocument();
    expect(screen.getByText(props.hour)).toBeInTheDocument();
    expect(screen.getByText(props.status)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });
});
