import React from "react";
import EditProfileModal from "@components/Modal/EditProfile/EditProfileModal";
import * as user from "mocks/user";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ModalActionTypes } from "contexts/types";
import { useModal } from "contexts/ModalContext";
import "@testing-library/jest-dom";

jest.mock("contexts/ModalContext");

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    query: {
      id: "Vitor",
    },
  })),
}));

jest.mock("@hooks/useUser", () => ({
  useUser: jest.fn(() => ({
    user: {
      ...user.guyHawkins,
    },
    setUser: jest.fn(),
  })),
}));

const getCountries = jest.fn(
  () =>
    new Promise((res) =>
      res([
        {
          value: "BR",
          label: "Brasil",
        },
      ])
    )
);

const getStates = jest.fn();

jest.mock("@hooks/useFetch", () => ({
  useFetch: () => ({
    getCountries,
    getStates,
  }),
}));

jest.mock("factories/useSkillsFactory", () => ({
  useSkillsFactory: jest.fn(() => ({
    isLoading: false,
  })),
}));

const renderComponent = () => {
  const queryClient = new ApolloClient({
    cache: new InMemoryCache(),
  });

  const app = render(
    <ApolloProvider client={queryClient}>
      <EditProfileModal />
      <OpenModal />
    </ApolloProvider>
  );

  return { app, queryClient };
};

const expectedInputLabels = [
  "Nome",
  "Sobrenome",
  "Profissão",
  "Bio",
  "Experiência",
  "Pais",
  "Estado",
  "Linkedin",
  "Portifólio/Github",
  "Anos experiência",
  /skills-/,
];

describe("EditProfileModal component test suite", () => {
  it("should throw when element is outside context provider", () => {
    const element = () => render(<EditProfileModal />);
    expect(element).toThrow();
  });

  it("should render modal when clicks a button", async () => {
    const openModal = jest.fn();
    (useModal as jest.Mock).mockImplementation(() => ({
      EDIT_PROFILE_MODAL: false,
      closeModal: jest.fn(),
      openModal,
    }));
    const { app } = renderComponent();

    const modals = app.queryAllByRole("dialog");
    expect(modals.length).toBe(0);
    expect(getCountries).toHaveBeenCalledTimes(1);
    expect(getStates).toHaveBeenCalledTimes(0);

    const openModalButton = app.getByText(/open modal/i);
    fireEvent.click(openModalButton);
    expect(openModal).toHaveBeenCalledWith("EDIT_PROFILE_MODAL");

    (useModal as jest.Mock).mockImplementation(() => ({
      EDIT_PROFILE_MODAL: true,
      closeModal: jest.fn(),
      openModal,
    }));

    await waitFor(() => {
      const modals = app.queryAllByRole("dialog");
      expect(modals.length).toBe(1);
    });
  });

  it("should render all fields properly", async () => {
    (useModal as jest.Mock).mockImplementation(() => ({
      EDIT_PROFILE_MODAL: true,
      closeModal: jest.fn(),
    }));
    renderComponent();

    for (const inputLabelText of expectedInputLabels) {
      const label = screen.getByRole("label", {
        name: inputLabelText,
      });
      expect(label).toBeInTheDocument();
    }
  });

  it("should render quantity of inputs", async () => {
    (useModal as jest.Mock).mockImplementation(() => ({
      EDIT_PROFILE_MODAL: true,
      closeModal: jest.fn(),
    }));
    renderComponent();
    const aditionalLabels = 0;
    const expectedLabelsQuantity = expectedInputLabels.length + aditionalLabels;

    const inputs = [];
    for (const inputLabelText of expectedInputLabels) {
      const input = screen.getByLabelText(inputLabelText);
      inputs.push(input);
    }

    expect(inputs.length).toBe(expectedLabelsQuantity);
  });
});

export function OpenModal() {
  const { openModal } = useModal();

  const handleClick = () => openModal(ModalActionTypes.EDIT_PROFILE_MODAL);

  return <button onClick={handleClick}>Open Modal</button>;
}
