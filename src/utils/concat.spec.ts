import { concat } from "./concat";

describe("concat function test suite", () => {
  it("should join multiple strings", () => {
    expect(concat("Olá", "Mundo")).toBe("Olá Mundo");
    expect(concat("Não é possível.", "Tente novamente.")).toBe(
      "Não é possível. Tente novamente."
    );
    expect(concat("Erro 404.", "Tente atualizar a página.")).toBe(
      "Erro 404. Tente atualizar a página."
    );
    expect(concat("", "x")).toBe("x");
    expect(concat("")).toBe("");
    expect(concat(" ", "x")).toBe(" x");
    expect(concat(" ", "x", "y", "    z", "o     ")).toBe(" x y z o");
    expect(
      concat(
        "Angel",
        `
      loremLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    `
      )
    ).toBe(
      `
    Angel loremLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    `.trim()
    );
    expect(concat("Cima", "Direita", "esquerda ", "Bai xo")).toBe(
      "Cima Direita esquerda Bai xo"
    );
    expect(
      concat(
        `
      a
    `,
        `
      b  
    `
      )
    ).toBe("a b");
  });
});
