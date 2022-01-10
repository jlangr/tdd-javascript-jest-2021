import Portfolio from "./portfolio";

describe("Portfolio", () => {
  let portfolio;
  beforeEach(() => (portfolio = new Portfolio()));

  it("No unique symbols on creation", () => {
    expect(portfolio.getSymbolCount).toEqual(0);
  });

  it("One unique symbol after a purchase", () => {
    portfolio.purchase();

    expect(portfolio.getSymbolCount).toEqual(1);
  });

  it("Purchases result in multiple unique symbols", () => {
    portfolio.purchase("ASDF");
    portfolio.purchase("META");

    expect(portfolio.getSymbolCount).toEqual(2);
  });

  it("No symbol duplicates after purchases", () => {
    portfolio.purchase("ASDF");
    portfolio.purchase("ASDF");

    expect(portfolio.getSymbolCount).toEqual(1);
  });

  it("returns 0 for symbol not purchased", () => {
    expect(portfolio.getShareCount("ASDF")).toEqual(0);
  });

  it("returns shares for a symbol after a purchase", () => {
    portfolio.purchase("ASDF", 10);

    expect(portfolio.getShareCount("ASDF")).toEqual(10);
  });

  it("errors out if shares < 0", () => {
    expect(() => portfolio.purchase("ASDF", -10)).toThrow();
  });

  it("updates shares bought over multiple purchases", () => {
		portfolio.purchase("ASDF", 10);
		portfolio.purchase("ASDF", 10);

    expect(portfolio.getShareCount("ASDF")).toEqual(20);
  });
});
