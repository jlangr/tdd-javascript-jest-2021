const numberOfCharactersInString = (s, char) =>
  (s.match(new RegExp(char, 'g'))||[]).length;

const parts = name => name.split(' ')

const last = name => name.parts[name.parts.length - 1]

const first = name => name.parts[0]

const isMononym = name => name.parts.length === 1

const isDuonym = name => name.parts.length === 2

const middleInitials = name =>
  name.parts
    .slice(1, -1)
    .map(part => initial(part))
    .join(' ')

const initial = namePart =>
  namePart.length === 1 ? namePart : `${namePart[0]}.`

const suffix = nameParse =>
  nameParse.suffix ? `,${nameParse.suffix}` : ''

const throwOnExcessCommas = name => {
  if (numberOfCharactersInString(name, ',') > 1)
    throw Error()
}

const nameParse = name => {
  const [baseName, suffixPart] = name.trim().split(',')
  return {
    name: name,
    parts: parts(baseName),
    baseName: baseName,
    suffix: suffixPart
  }
}

export const normalize = name => {
  throwOnExcessCommas(name)
  const parsed = nameParse(name)
  if (isMononym(parsed)) return parsed.baseName
  if (isDuonym(parsed)) return `${last(parsed)}, ${first(parsed)}`
  return `${last(parsed)}, ${first(parsed)} ${middleInitials(parsed)}${suffix(parsed)}`
}
