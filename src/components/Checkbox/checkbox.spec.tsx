import { render } from "@testing-library/react";
import CheckBox from "./Checkbox";

describe("Checkbox", () => {
  it("Checkbox", () => {
    const { getByLabelText } = render(
      <CheckBox name="teste" id="teste" label="teste" />
    );

    const checkbox = getByLabelText("teste");
    expect(checkbox).toBeTruthy();
  });

  it("Checkbox selected", () => {
    const { getByLabelText } = render(
      <CheckBox name="teste" id="teste" label="teste" aria-checked={true} />
    );

    const checkbox = getByLabelText("teste");

    expect(checkbox).toBeTruthy();
  });
});
