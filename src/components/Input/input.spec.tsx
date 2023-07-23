import { InputElement } from "@components/Input/Input";
import { render } from "@testing-library/react";

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
});
