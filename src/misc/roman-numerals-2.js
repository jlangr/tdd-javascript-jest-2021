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
    //Subtract the largest number you can, as many times as you can
    while (number != 0) {
        while (number >= 1000) {
            romanNumeral += "M";
            number -= 1000;
        }
        while (number >= 500) {
            romanNumeral += "D";
            number -= 500;
        }
        while (number >= 100) {
            romanNumeral += "C";
            number -= 100;
        }
        while (number >= 50) {
            romanNumeral += "L";
            number -= 50;
        }
        while (number >= 10) {
            romanNumeral += "X";
            number -= 10;
        }
        while (number >= 5) {
            romanNumeral += "V";
            number -= 5;
        }
        while (number >= 1) {
            romanNumeral += "I";
            number -=1;
        }
    }

    return romanNumeral;
};