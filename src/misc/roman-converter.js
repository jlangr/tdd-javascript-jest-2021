
const singleDigit = num => {
  if(num === 5){
    return "V"
  }

  if(num === 10){
    return "X"
  }

  return "I".repeat(num)
}

export const convert = (num) => {
  return singleDigit(num)
}

`
I
II
III
IV
V
VI
VII
VIII
IX
X
`