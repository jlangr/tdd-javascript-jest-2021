import * as Portfolio from "./portfolio";

describe("a portfolio", () => {
  let portfolio;

  describe("before any purchases made", () => {
    beforeEach(() => {
      portfolio = Portfolio.create();
    });

    it("is empty", () => {
      expect(Portfolio.isEmpty(portfolio)).toBe(true);
    });

    it("has a unique symbol count of 0", () => {
      expect(Portfolio.uniqueSymbolCount(portfolio)).toEqual(0);
    });

    it("returns 0 for shares of a symbol", () => {
      expect(Portfolio.sharesOf(portfolio, "BAYN")).toEqual(0);
    });

    it("throws when buying non-positive shares", () => {
      expect(() => {
        Portfolio.purchase(portfolio, "", 0);
      }).toThrow(RangeError);
    });
  });

  describe("after purchasing a symbol", () => {
    beforeEach(() => {
      portfolio = Portfolio.create();
      portfolio = Portfolio.purchase(portfolio, "BAYN", 42);
    });

    it("is not empty", () => {
      expect(Portfolio.isEmpty(portfolio)).toBe(false);
    });

    it("has a unique symbol count of 1", () => {
      expect(Portfolio.uniqueSymbolCount(portfolio)).toEqual(1);
    });

    it("returns shares for that symbol", () => {
      expect(Portfolio.sharesOf(portfolio, "BAYN")).toEqual(42);
    });

    it("decreases shares when selling", () => {
      const newPortfolio = Portfolio.sell(portfolio, "BAYN", 12);

      expect(Portfolio.sharesOf(newPortfolio, "BAYN")).toEqual(30);
    });

    it("removes symbol when selling all", () => {
      const newPortfolio = Portfolio.sell(portfolio, "BAYN", 42);

      expect(Portfolio.uniqueSymbolCount(newPortfolio, "BAYN")).toEqual(0);
    });
  });

  describe("after purchasing different symbol", () => {
    beforeEach(() => {
      portfolio = Portfolio.create();
      portfolio = Portfolio.purchase(portfolio, "BAYN", 12);
      portfolio = Portfolio.purchase(portfolio, "AAPL", 1);
    });

    it("increments the unique symbol count", () => {
      expect(Portfolio.uniqueSymbolCount(portfolio)).toEqual(2);
    });

    it("returns shares for that symbol", () => {
      expect(Portfolio.sharesOf(portfolio, "BAYN")).toEqual(12);
    });
  });

  describe("after purchasing same symbol", () => {
    beforeEach(() => {
      portfolio = Portfolio.create();
      portfolio = Portfolio.purchase(portfolio, "BAYN", 10);
      portfolio = Portfolio.purchase(portfolio, "BAYN", 1);
    });

    it("does not increment the unique symbol count", () => {
      expect(Portfolio.uniqueSymbolCount(portfolio)).toEqual(1);
    });

    it("returns accumulated shares from purchases", () => {
      expect(Portfolio.sharesOf(portfolio, "BAYN")).toEqual(11);
    });
  });

  describe("value", () => {
    const stockPriceService = (symbol) => 1;
    beforeEach(() => {
      portfolio = Portfolio.create();
    });
    describe("when empty", () => {
      it("has value of 0", () => {
        expect(Portfolio.value(portfolio)).toEqual(0);
      });
    });
    describe("when a single purchase is made", () => {
      it("has value of individual stock", () => {
        portfolio = Portfolio.purchase(portfolio, "GME", 1);
        expect(Portfolio.value(portfolio, stockPriceService)).toEqual(1);
      });
    });

    describe("when multiple purchases are made", () => {
      describe("with multiple shares", () => {
        it("has value of 1 when portfolio contains single stock", () => {
          portfolio = Portfolio.purchase(portfolio, "GME", 3);
          expect(Portfolio.value(portfolio, stockPriceService)).toEqual(3);
        });
      });
      //symbols
    });
  });
});
