import MentoringLinkCard from "./MentoringLinkCard";
import { render, screen } from "@testing-library/react";
import { Props } from "./MentoringLinkCard.types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "@testing-library/jest-dom/extend-expect";

const defaultProps: Props = {
  avatar: "https://via.placeholder.com/98",
  name: "João da Silva",
  job: "Software Engineer",
  status: "A confirmar",
  date: new Date(),
  hour: new Date(),
};

describe("MentoringLinkCard", () => {
  test("renders the component with default props", () => {
    render(<MentoringLinkCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.job)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.status)).toBeInTheDocument();
    expect(screen.getByText(/Acessar chamada/)).toBeInTheDocument();
  });

  test("renders the component with different status", () => {
    const status = "Não realizada";
    render(<MentoringLinkCard {...defaultProps} status={status} />);
    expect(screen.getByText(status)).toBeInTheDocument();
  });

  test("renders the date and hour", () => {
    render(<MentoringLinkCard {...defaultProps} />);
    const expectedFormattedDate = format(
      defaultProps.date,
      "dd 'de' MMMM yyyy",
      { locale: ptBR }
    );
    const expectedFormattedHour = format(defaultProps.hour, "HH'h'mm");
    expect(screen.getByText(expectedFormattedDate)).toBeInTheDocument();
    expect(screen.getByText(expectedFormattedHour)).toBeInTheDocument();
  });
});
