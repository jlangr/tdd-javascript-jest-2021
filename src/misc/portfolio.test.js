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
    portfolio.purchase("ASDF")
    portfolio.purchase("META")

    expect(portfolio.getSymbolCount).toEqual(2);
  });

  it("No symbol duplicates after purchases", () => {
    portfolio.purchase("ASDF")
    portfolio.purchase("ASDF")

    expect(portfolio.getSymbolCount).toEqual(1);
  });
});
