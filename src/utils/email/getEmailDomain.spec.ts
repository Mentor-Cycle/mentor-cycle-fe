import { getEmailDomain } from "./getEmailDomain";

describe("getEmailDomain function test suite", () => {
  it("should return email domain", () => {
    expect(getEmailDomain("seunome@gmail.com")).toBe("gmail");
    expect(getEmailDomain("seu.nome@hotmail.net")).toBe("hotmail");
    expect(getEmailDomain("__joao.peedr01@provider.net")).toBe("provider");
  });
  it("bad input, should return empty string", () => {
    expect(getEmailDomain("badinput.com")).toBe("");
    expect(getEmailDomain("myname@.com")).toBe("");
    expect(getEmailDomain("@")).toBe("");
  });
});
