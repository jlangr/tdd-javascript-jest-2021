export const convertNumber = (number) => {
    const digitLookup = {
        '1': 'I',
        '4': 'IV',
        '5': 'V',
        '9': 'IX',
        '10': 'X',
        '40': 'XL',
        '50': 'L',
        '90': 'XC',
        '100': 'C',
        '400': 'CD',
        '500': 'D',
        '900': 'CM',
        '1000': 'M',
        '4000': 'MV',
        '5000': 'V',
    }
    const subtractionOrder = [5000, 4000, 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    let romanNumeral = "";
    //Subtract the largest number you can, as many times as you can
    while (number != 0) {
        for (let i = 0; i < subtractionOrder.length; i++) {
            const numberToSubtract = subtractionOrder[i];
            while (number >= numberToSubtract) {
                romanNumeral += digitLookup[numberToSubtract];
                number -= numberToSubtract;
            }
        }
    }

    return romanNumeral;
};