import { render } from "@testing-library/react";
import imgPerfil from "../../public/imgCard.png";
import CardNotification from "./CardNotification";

describe("CardNotification", () => {
  it("CardNotification not viewed", () => {
    const { getByTestId } = render(
      <CardNotification
        description="teste"
        imgUrl={imgPerfil.src}
        name="Ronald Richards"
      />
    );

    const card = getByTestId("card");

    expect(card).toBeTruthy();
    expect(card.classList.contains("bg-primary-01")).toBe(true);
  });

  it("CardNotification  viewed", () => {
    const { getByTestId } = render(
      <CardNotification
        description="teste"
        imgUrl={imgPerfil.src}
        name="Ronald Richards"
        alreadyViewed
      />
    );

    const card = getByTestId("card");

    expect(card).toBeTruthy();
    expect(card.classList.contains("bg-transparent")).toBe(true);
  });
});
