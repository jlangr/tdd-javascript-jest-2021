// this will likeley prove useful and you won't
// have to find it on StackOverflow:
//const numberOfCharactersInString = (s, char) =>
//  (s.match(new RegExp(char, 'g'))||[]).length;

const parts = name => name.split(' ')

const last = name => parts(name)[parts(name).length-1]

const middles = name => parts(name).slice(1,-1)

const first = name => parts(name)[0]

const abbreviate = name => {
  if(name.length === 1){
    return name.charAt(0)
  }

  return `${name.charAt(0)}.`
}

const suffixPresent = name => name.indexOf(',') >= -1

const isMononym = name => parts(name).length === 1

const isTwoName = name => parts(name).length === 2

const trimWhiteSpace = name => name.trim()

export const normalize = name => {

  let suffix = name.indexOf(",")

  let sanitizedName = trimWhiteSpace(name)
  let firstName = first(sanitizedName)
  let lastName = last(sanitizedName)

  if (isMononym(sanitizedName)) {
    return sanitizedName
  }
  else if (isTwoName(sanitizedName)){
    return `${lastName}, ${firstName}`
  }

  let middleNames = middles(sanitizedName).map( abbreviate ).join(" ")
  return `${lastName}, ${firstName} ${middleNames}`
}
