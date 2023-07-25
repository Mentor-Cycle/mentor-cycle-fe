import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SelectLocation from "@components/LocationSelector";

const renderComponent = () => {
  const app = render(
    <SelectLocation
      onSelect={() => {}}
      options={[
        {
          nome: "1",
          sigla: "1",
        },
      ]}
      label="Nome:"
      name="name"
      placeholder="teste"
      htmlFor="select-test"
    />
  );

  return { app };
};

describe("<SelectLocation /> test suite", () => {
  it("should render a label and a select elements", () => {
    const { app } = renderComponent();

    const labels = app.container.querySelectorAll("label");
    const selects = screen.getAllByRole("combobox");
    expect(labels.length).toBe(1);
    expect(selects.length).toBe(1);
  });

  it("should focus on select when clicks on label", async () => {
    renderComponent();

    const label = screen.getByRole("label", { name: "Nome:" });
    const select = screen.getByRole("combobox");
    expect(select).not.toHaveFocus();
    userEvent.click(label);
    await waitFor(() => {
      expect(select).toHaveFocus();
    });
  });
});
