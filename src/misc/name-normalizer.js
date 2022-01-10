// this will likeley prove useful and you won't
// have to find it on StackOverflow:
//const numberOfCharactersInString = (s, char) =>
//  (s.match(new RegExp(char, 'g'))||[]).length;

const parts = name => name.split(' ')

const last = name => parts(name)[parts(name).length-1]

const middle = name => parts(name)[1]

const first = name => parts(name)[0]

const abbreviate = name => {
  if(name.length === 1){
    return name.charAt(0)
  }

  return `${name.charAt(0)}.`
}

const isMononym = name => parts(name).length === 1

const isTwoName = name => parts(name).length === 2

const isThreeName = name => parts(name).length === 3

const isNumName = (name, num) => parts(name).length === num

const trimWhiteSpace = name => name.trim()

export const normalize = name => {

  name = trimWhiteSpace(name)

  if (isMononym(name)) {
    return name
  }
  else if (isTwoName(name)){
    return `${last(name)}, ${first(name)}`
  }
  else if (isThreeName(name)) {
    return `${last(name)}, ${first(name)} ${abbreviate(middle(name))}`
  }
}
