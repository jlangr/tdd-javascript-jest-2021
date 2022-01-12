import Portfolio from "./portfolio";

describe("Portfolio", () => {
  let portfolio;
  beforeEach(() => (portfolio = new Portfolio()));
  fdescribe("value", () => {
    const stubFunction = (value) => value * 20

    it("has no value", () => {
      expect(portfolio.getValue()).toEqual(0);
    });
    it("returns value of 1 share", () => {
      portfolio.purchase("ASDF", 1)

      expect(portfolio.getValue(stubFunction(1))).toEqual(20);
    });
    it("returns value of multiple shares", () => {

      expect(portfolio.getValue(stubFunction())).toEqual(40);
    });

    xit("returns value of share for multiple symbols", () => {
      expect(portfolio.getValue).toEqual(1);
    });
  });
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

  it("decreases the share count by the sell amount", () => {
    portfolio.purchase("ASDF", 10);
    portfolio.sell("ASDF", 5);

    expect(portfolio.getShareCount("ASDF")).toEqual(5);
  });

  it("throws when selling more shares than exist", () => {
    portfolio.purchase("ASDF", 10);

    expect(() => portfolio.sell("ASDF", 15)).toThrow();
  });

  it("throws when selling 0 or negative amount of shares", () => {
    portfolio.purchase("ASDF", 10);

    expect(() => portfolio.sell("ASDF", -15)).toThrow();
    expect(() => portfolio.sell("ASDF", 0)).toThrow();
  });

  it("decrements the symbol count after selling all shares of a given symbol", () => {
    portfolio.purchase("ASDF", 10);
    expect(portfolio.getSymbolCount).toEqual(1);

    portfolio.sell("ASDF", 10);
    expect(portfolio.getSymbolCount).toEqual(0);
  });
});
