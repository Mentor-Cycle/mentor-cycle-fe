import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

import { FaApple } from "react-icons/fa";
import { Button } from "./Button";

describe("button", () => {
  it("button primary enabled", () => {
    const click = jest.fn(() => {});
    const { getByText } = render(
      <Button type="submit" variant="primary" onClick={click}>
        Enviar
      </Button>
    );
    const button = getByText("Enviar");
    fireEvent.click(button);

    expect(button).toBeTruthy();
    expect(button.classList.contains("bg-primary-03")).toBe(true);
    expect(click).toHaveBeenCalled();
  });
  it("button secondary disabled", () => {
    const click = jest.fn(() => {});
    const { getByText } = render(
      <Button type="submit" variant="secondary" onClick={click} disabled>
        Enviar
      </Button>
    );
    const button = getByText("Enviar");
    fireEvent.click(button);

    expect(button.classList.contains("bg-neutral-01")).toBe(true);
    expect(button.hasAttribute("disabled")).toBe(true);
    expect(click).not.toHaveBeenCalled();
  });
  it("button icon", () => {
    const click = jest.fn(() => {});

    const { getByTitle, queryByTestId } = render(
      <Button
        type="submit"
        variant="primary"
        title="buttonIcon"
        onClick={click}
      >
        <Button.Icon icon={FaApple} />
      </Button>
    );

    const button = getByTitle("buttonIcon");
    const icon = queryByTestId("icon");
    fireEvent.click(button);

    expect(button).toBeTruthy();
    expect(click).toHaveBeenCalled();
    expect(icon).toBeInTheDocument();
  });
});
