import Textarea from "./Textarea";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Text Area", () => {
  it("TextArea enabled", () => {
    const { getByPlaceholderText } = render(
      <Textarea name="teste" placeholder="teste" />
    );

    const textArea = getByPlaceholderText("teste");
    expect(textArea).toBeTruthy();
  });

  it("TextArea disabled", () => {
    const { getByPlaceholderText } = render(
      <Textarea name="teste" placeholder="teste" disabled />
    );

    const textArea = getByPlaceholderText("teste");
    expect(textArea).toBeTruthy();
    expect(textArea.hasAttribute("disabled")).toBe(true);
  });

  it("should render a label and a textarea elements", () => {
    const { container } = render(
      <Textarea label="Nome:" name="name" placeholder="teste" disabled />
    );

    const labels = container.querySelectorAll("label");
    const textareas = container.querySelectorAll("textarea");
    expect(labels.length).toBe(1);
    expect(textareas.length).toBe(1);
  });

  it("should focus on textarea when clicks on label", async () => {
    render(<Textarea label="Nome:" name="name" placeholder="teste" />);

    const label = screen.getByText(/nome:/i);
    const textarea = screen.getByPlaceholderText("teste");
    expect(textarea).not.toHaveFocus();
    userEvent.click(label);
    await waitFor(() => {
      expect(textarea).toHaveFocus();
    });
  });
});
