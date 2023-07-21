import { getEmailTopLevelDomain } from "./getEmailTopLevelDomain";

describe("getTopLevelEmailDomain function test suite", () => {
  it("should return email top level domain", () => {
    expect(getEmailTopLevelDomain("seunome@gmail.com")).toBe("com");
    expect(getEmailTopLevelDomain("seunome@.gmail.net")).toBe("net");
    expect(getEmailTopLevelDomain(".net.com.io")).toBe("io");
  });
  it("bad input, should return empty string", () => {
    expect(getEmailTopLevelDomain("seunome@gmail")).toBe("");
    expect(getEmailTopLevelDomain("org")).toBe("");
    expect(getEmailTopLevelDomain("")).toBe("");
  });
});
