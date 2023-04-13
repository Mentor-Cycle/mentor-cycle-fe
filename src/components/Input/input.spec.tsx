import { render } from "@testing-library/react";
import Input from "./Input";

describe("input", () => {
  it("input", () => {
    const { getByPlaceholderText } = render(
      <Input name="name" placeholder="teste" />
    );

    const input = getByPlaceholderText("teste");
    expect(input).toBeTruthy();
  });

  it("input disabled", () => {
    const { getByPlaceholderText } = render(
      <Input name="name" placeholder="teste" disabled />
    );

    const input = getByPlaceholderText("teste");
    expect(input.hasAttribute("disabled")).toBe(true);
  });
});
