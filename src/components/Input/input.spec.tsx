import { InputElement } from "@components/Input/Input";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("input", () => {
  it("input", () => {
    const { getByPlaceholderText } = render(
      <InputElement name="name" placeholder="teste" />
    );

    const input = getByPlaceholderText("teste");
    expect(input).toBeTruthy();
  });

  it("input disabled", () => {
    const { getByPlaceholderText } = render(
      <InputElement name="name" placeholder="teste" disabled />
    );

    const input = getByPlaceholderText("teste");
    expect(input.hasAttribute("disabled")).toBe(true);
  });

  it("should render a label and a input elements", () => {
    const { container } = render(
      <InputElement label="Nome:" name="name" placeholder="teste" disabled />
    );

    const labels = container.querySelectorAll("label");
    const inputs = container.querySelectorAll("input");
    expect(labels.length).toBe(1);
    expect(inputs.length).toBe(1);
  });

  it("should focus on input when clicks on label", async () => {
    render(<InputElement label="Nome:" name="name" placeholder="teste" />);

    const label = screen.getByText(/nome:/i);
    const input = screen.getByPlaceholderText("teste");
    expect(input).not.toHaveFocus();
    userEvent.click(label);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
  });
});
