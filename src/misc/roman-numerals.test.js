import { convertNumber } from "./roman-numerals";

describe("Roman Numeral Conversions", () => {
    it("returns I for 1", () => {
        expect(convertNumber(1)).toEqual("I");
    });

    it("returns II for 2", () => {
        expect(convertNumber(2)).toEqual("II");
    });

    it("returns X for 10", () => {
        expect(convertNumber(10)).toEqual("X");
    });

    it("returns XX for 20", () => {
        expect(convertNumber(20)).toEqual("XX");
    });

    it("returns C for 100", () => {
        expect(convertNumber(100)).toEqual("C");
    });

    it("returns M for 1000", () => {
        expect(convertNumber(1000)).toEqual("M");
    });

    it("returns XI for 11", () => {
        expect(convertNumber(11)).toEqual("XI");
    });

    it("returns XII for 12", () => {
        expect(convertNumber(12)).toEqual("XII");
    });

    it("returns XXII for 22", () => {
        expect(convertNumber(22)).toEqual("XXII");
    });

    it("returns MCIII for 1103", () => {
        expect(convertNumber(1103)).toEqual("MCIII");
    });

    it("returns MCCXXXIII for 1233", () => {
        expect(convertNumber(1233)).toEqual("MCCXXXIII");
    });

    it("returns V for 5", () => {
        expect(convertNumber(5)).toEqual("V");
    });

    it("returns LXXVII for 77", () => {
        expect(convertNumber(77)).toEqual("LXXVII");
    });

    it("returns IV for 4", () => {
        expect(convertNumber(4)).toEqual("IV");
    });

    it("returns IX for 9", () => {
        expect(convertNumber(9)).toEqual("IX");
    });

    it("returns XL for 40", () => {
        expect(convertNumber(40)).toEqual("XL");
    });

    it("returns MCM for 1900", () => {
        expect(convertNumber(1900)).toEqual("MCM");
    });

    it("returns MV for 4000", () => {
        expect(convertNumber(4000)).toEqual("MV");
    });
})