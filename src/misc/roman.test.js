import {convert} from "./roman"

describe('a roman number converter', () => {
  it('converts 1', () => {
    expect(convert(1)).toEqual('I')
    expect(convert(2)).toEqual('II')
    expect(convert(3)).toEqual('III')
    expect(convert(4)).toEqual('IV')
    expect(convert(5)).toEqual('V')
    expect(convert(10)).toEqual('X')
    expect(convert(13)).toEqual('XIII')
    expect(convert(20)).toEqual('XX')
    expect(convert(200)).toEqual('CC')
    expect(convert(3487)).toEqual('MMMCDLXXXVII')
    expect(convert(99)).toEqual('XCIX')
  })
})
