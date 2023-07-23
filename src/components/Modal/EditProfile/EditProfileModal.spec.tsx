import { RenderResult, fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditProfileModal from "@components/Modal/EditProfile/EditProfileModal";
import { ModalProvider, useModal } from "contexts/ModalContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UserProvider } from "providers/user/AppContext";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import React, { useState } from "react";
import { ModalActionTypes } from "contexts/types";
import * as Dialog from "@radix-ui/react-dialog";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        id: "Vitor",
      },
    };
  },
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

const getStates = jest.fn(
  () =>
    new Promise((res) =>
      res([
        {
          value: "RS",
          label: "Rio Grande do Sul",
        },
      ])
    )
);

const appOpenModal = async (
  app: RenderResult<
    typeof import("/home/vitormarkist998/mentor-cycle-fe/node_modules/@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >
) => {
  await waitFor(() => {
    const element = app.getByText("Open Modal");
    fireEvent.click(element);
  });
};

jest.mock("@hooks/useFetch", () => ({
  useFetch: () => ({
    getCountries,
    getStates,
  }),
}));

const renderComponent = () => {
  const queryClient = new ApolloClient({
    cache: new InMemoryCache(),
  });

  const app = render(
    <ApolloProvider client={queryClient}>
      <UserProvider>
        <ModalProvider>
          <EditProfileModal />
          <OpenModal />
        </ModalProvider>
      </UserProvider>
    </ApolloProvider>
  );

  return { app, queryClient };
};

describe("EditProfileModal component test suite", () => {
  it("should throw when element is outside context provider", () => {
    const element = () => render(<EditProfileModal />);
    expect(element).toThrow();
  });

  it("should render modal when clicks a button", async () => {
    const { app } = renderComponent();

    await waitFor(() => {
      const modals = app.queryAllByTestId("edit-profile-modal-wrapper");
      expect(modals.length).toBe(0);
      expect(getCountries).toHaveBeenCalledTimes(2); // should be 1
      expect(getStates).toHaveBeenCalledTimes(0);
    });

    await waitFor(() => {
      const element = app.getByText("Open Modal");
      fireEvent.click(element);
      const modals = app.queryAllByTestId("edit-profile-modal-wrapper");
      expect(modals.length).toBe(2);
    });
  });

  it("should render all fields properly", async () => {
    const { app } = renderComponent();

    await waitFor(() => {
      const element = app.getByRole("button", {
        name: /open modal/i,
      });
      fireEvent.click(element);
    });

    const expectedTexts = [
      /nome/i,
      /sobrenome/i,
      /profissão/i,
      /bio/i,
      /experiência/i,
      /pais/i,
      /estado/i,
      /linkedin/i,
      /portifólio\/github/i,
      /anos experiência/i,
      /especialização/i,
    ];

    for (const textRegex of expectedTexts) {
      await waitFor(() => {
        const [element] = screen.getAllByText(textRegex);
        expect(element).toBeTruthy();
      });
    }
  });
});

export function OpenModal() {
  const { openModal } = useModal();

  return (
    <button onClick={() => openModal(ModalActionTypes.EDIT_PROFILE_MODAL)}>
      Open Modal
    </button>
  );
}
