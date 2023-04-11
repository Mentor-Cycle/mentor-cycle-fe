import { render } from "@testing-library/react";
import Textarea from "./Textarea";

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
});
