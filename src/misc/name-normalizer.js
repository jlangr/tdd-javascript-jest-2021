// this will likeley prove useful and you won't
// have to find it on StackOverflow:
const numberOfCharactersInString = (s, char) =>
  (s.match(new RegExp(char, 'g'))||[]).length;

const parts = name => name.trim().split(' ')

const initial = name => name.length === 1 ? name : `${name[0]}.`

const last = name => parts(name)[parts(name).length - 1]
const first = name => parts(name)[0]

const middleNames = name => parts(name).slice(1, -1)

const middleInitials = name =>
  middleNames(name).map(initial).join(' ')

const isMononym = name => parts(name).length === 1
const isDuonym = name => parts(name).length === 2

const removeSuffix = rawName => {
  const [name, _] = rawName.split(',')
  return name
}

const suffix = rawName => {
  const [_, suffix] = rawName.split(',')
  return suffix ? `,${suffix}` : ''
}

const throwOnTooManyCommas = rawName => {
  if (numberOfCharactersInString(rawName, ',') > 1)
    throw new Error()
}

export const normalize = rawName => {
  throwOnTooManyCommas(rawName)
  const name = removeSuffix(rawName)
  if (isMononym(name)) return name
  if (isDuonym(name)) return `${last(name)}, ${first(name)}`
  return `${last(name)}, ${first(name)} ${middleInitials(name)}${suffix(rawName)}`
}
