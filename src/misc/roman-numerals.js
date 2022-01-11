export const convertNumber = (number) => {
    const digitLookup = {
        '1': 'I',
        '2': 'X',
        '3': 'C',
        '4': 'M',
    }
    const numberString = number.toString();
    const numDigits = numberString.length;
    let romanNumeral = "";

    for (let x = 0; x < numberString[0]; x++) {
        romanNumeral += digitLookup[numDigits];
    }

    let remainder = 0;
    switch (numDigits) {
        case 2:
            remainder = number % 10;
            break;
        case 3:
            remainder = number % 100;
            break;
        case 4:
            remainder = number % 1000;
            break;
    }

    //TODO = need to do remainder again if possible

    console.log(remainder);

    for (let i = 0; i < remainder; i++) {
        romanNumeral += digitLookup[numDigits - 1];
    }

    return romanNumeral;
}