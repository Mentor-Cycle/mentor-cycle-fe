import { Input } from "@components/InputForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

const renderComponent = () => {
  const app = render(
    <>
      <Input.Label htmlFor="favcolors" label="Cores Favoritas" />
      <Input.MultiSelect
        name="favoriteColors"
        onBlur={() => {}}
        onChange={() => {}}
        value={["blue", "yellow", "green", "red"]}
        id="favcolors"
      />
    </>
  );

  return { app };
};

describe("MultiSelect test suite", () => {
  it("should render a label and a multiselect elements", () => {
    const { app } = renderComponent();

    const labels = app.container.querySelectorAll("label");
    const multiselects = app.container.querySelectorAll("[role=combobox]");

    expect(labels.length).toBe(1);
    expect(multiselects.length).toBe(1);
  });

  it("should focus on select when clicks on label", async () => {
    renderComponent();

    const label = screen.getByRole("label", {
      name: "Cores Favoritas",
    });
    const multiselect = screen.getByLabelText("Cores Favoritas");

    expect(multiselect).not.toHaveFocus();
    userEvent.click(label);
    await waitFor(() => {
      expect(multiselect).toHaveFocus();
    });
  });

  it("should navigate via tab from body to multiselect to clear all clear all options button properly", async () => {
    render(
      <>
        <Input.MultiSelect
          name="favoriteColors"
          onBlur={() => {}}
          onChange={() => {}}
          options={["blue", "red"]}
          value={[]}
          id="favcolors"
        />
        <input type="text" />
      </>
    );

    const multiselect = screen.getByRole("combobox");
    const clerAllOptionsButton = screen.getByRole("button");

    expect(multiselect).not.toHaveFocus();
    await userEvent.tab();
    await waitFor(() => {
      expect(multiselect).toHaveFocus();
    });
    await userEvent.tab();
    await waitFor(() => {
      expect(clerAllOptionsButton).toHaveFocus();
    });
    await userEvent.tab();
    await waitFor(() => {
      expect(multiselect).not.toHaveFocus();
      expect(clerAllOptionsButton).not.toHaveFocus();
    });
  });
});
