import { getEmailUsername } from "./getEmailUsername";

describe("getEmailUsername function test suite", () => {
  it("should return email username", () => {
    expect(getEmailUsername("seunome@gmail.com")).toBe("seunome");
    expect(getEmailUsername("seu.nome@.gmail.net")).toBe("seu.nome");
    expect(getEmailUsername("__joao.peedr01@provider.net")).toBe("__joao.peedr01");
  });
  it("bad input, should return empty string", () => {
    expect(getEmailUsername("seu.nome")).toBe("");
    expect(getEmailUsername("__seunome998.com")).toBe("");
    expect(getEmailUsername("@")).toBe("");
  });
});
