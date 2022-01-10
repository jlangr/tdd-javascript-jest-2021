// this will likeley prove useful and you won't
// have to find it on StackOverflow:
//const numberOfCharactersInString = (s, char) =>
//  (s.match(new RegExp(char, 'g'))||[]).length;

const parts = (name) => name.split(" ");

const last = (name) => {
  const lastNameIndex = parts(name).length - 1;
  return parts(name)[lastNameIndex];
};

const first = (name) => parts(name)[0];

const middle = (name) => {
  if (parts(name).length > 2) {
    const middleNames = parts(name).slice(1, -1);
    const middleInitials = middleNames.map((middleName) => {
      const middleInitial =
        middleName.length > 1 ? `${middleName[0]}.` : middleName[0];

      return middleInitial;
    });

    return middleInitials.join(' ').trim()
  }

  return "";
};

const isMononym = (name) => parts(name).length === 1;

export const normalize = (rawName) => {
  const name = rawName.trim();
  if (isMononym(name)) return name;
  return `${last(name)}, ${first(name)} ${middle(name)}`.trim();
};
