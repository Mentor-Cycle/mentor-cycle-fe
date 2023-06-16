import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardCardProfile from "./DashboardCardProfile";
import { Props } from "./DashboardCardProfile.types";
import "@testing-library/jest-dom/extend-expect";

describe("DashboardCardProfile", () => {
  const props: Props = {
    name: "Ronald Richards",
    job: "Software Engineer at Apple",
    skills: ["Frontend", "Backend", "DevOps"],
    avatarUrl: "/test.png",
  };

  it("renders name and job", () => {
    render(<DashboardCardProfile {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.job)).toBeInTheDocument();
  });

  it("renders skills", () => {
    render(<DashboardCardProfile {...props} />);
    props.skills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });
});
