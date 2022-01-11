import e from "express";

export const convertNumber = (number) => {
    const digitLookup = {
        '1': 'I',
        '5': 'V',
        '10': 'X',
        '50': 'L',
        '100': 'C',
        '500': 'D',
        '1000': 'M',
    }

    let romanNumeral = "";
    let numberString = "";
    let numDigits = 0;

    // let remainder = doModulus(number);
    // numberString = number.toString();
    // numDigits = numberString.length;
    // if (remainder === 0) {
    //     romanNumeral += digitLookup[numberString[0]]
    // }

    while (number != 0) {
        numberString = number.toString();
        numDigits = numberString.length;
        const base10 = 10**(numDigits-1);
        
        console.log('numberString: ', numberString, ' ----- base10', base10);

        if (doModulus(number) === 0) {
            romanNumeral += digitLookup[base10.toString()]
        } else {
            for (let x = 0; x < numberString[0]; x++) {
                romanNumeral += digitLookup[base10.toString()];
            }
        }
        number = doModulus(number);
    }

    return romanNumeral;
}

const doModulus = (number) => {
    let mod = 1;
    if (number >= 1000) {
        mod = 1000;
    } else if (number >= 500) {
        mod = 500;
    } else if (number >= 100) {
        mod = 100;
    } else if (number >= 10) {
        mod = 10;
    } else if (number >= 5) {
        mod = 5;
    }
    return number % mod;
};