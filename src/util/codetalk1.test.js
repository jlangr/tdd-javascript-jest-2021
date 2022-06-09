import { dispTime, displayTime } from "./codetalk1";

describe('dispTime converts seconds to hours & minutes string', () => {
  const cases = [
    {seconds: "$%x!!", expected: ""},
    {seconds: 0, expected: ""},
    {seconds: 1, expected: ""},
    {seconds: 60, expected: "1 minute"},
    {seconds: 61, expected: "1 minute"},
    {seconds: 120, expected: "2 minutes"},
    {seconds: "605", expected: "10 minutes"},
    {seconds: 5400, expected: "1 hour 30 minutes"},
    {seconds: 7200, expected: "2 hours"},
    {seconds: 7530, expected: "2 hours 5 minutes"},
    {seconds: 7285, expected: "2 hours 1 minute"},
  ]
  cases.forEach(({seconds, expected}) => {
    it(`converts ${seconds} seconds to ${expected}`, () => {
      expect(displayTime(seconds)).toEqual(expected)
    })
  })
})
