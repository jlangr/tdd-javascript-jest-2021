import { languageTag } from './country'

describe('language tag', () => {
  xit('returns translation for single-language country', () => {
    expect(languageTag('AUT_DE')).toEqual('Sprache')
  })
})
