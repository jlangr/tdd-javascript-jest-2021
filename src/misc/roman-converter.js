



export const convert = (num) => {

  if(num === 5){
    return "V"
  }

  if(num === 10){
    return "X"
  }

  return "I".repeat(num)

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