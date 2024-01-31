const thousandsToWords = [
  '', 'mil', 'dois mil', 'três mil', 'quatro mil', 'cinco mil',
  'seis mil', 'sete mil', 'oito mil', 'nove mil', 'dez mil'
];

const numbersToWords = [
  '', 'cem', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos',
  'seiscentos', 'setecentos', 'oitocentos', 'novecentos'
];

const smallNumbersToWords = [
  '', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
  'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
];

const tensToWords = [
  '', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'
];


//@ts-ignore
const getWordsForNumber = (number) => {
  if (number === 0) {
    return '';
  } else if (number >= 1 && number <= 10) {
    return smallNumbersToWords[number];
  } else if (number > 10 && number < 20) {
    return `dez${smallNumbersToWords[number % 10] ? ` e ${smallNumbersToWords[number % 10]}` : ''}`;
  } else if (number >= 20 && number < 100) {
    const tens = Math.floor(number / 10);
    const ones = number % 10;
    const onesPart = ones > 0 ? ` e ${smallNumbersToWords[ones]}` : '';
    return `${tensToWords[tens]}${onesPart}`;
  } else if (number >= 100 && number < 1000) {
    const hundreds = Math.floor(number / 100);
    const remaining = number % 100;
    //@ts-ignore
    const remainingPart = remaining > 0 ? ` e ${getWordsForNumber(remaining)}` : '';
    return `${numbersToWords[hundreds]}${remainingPart}`;
  } else if (number >= 1000 && number < 10000) {
    const thousands = Math.floor(number / 1000);
    const remainder = number % 1000;
    //@ts-ignore
    const remainderPart = remainder > 0 ? ` e ${getWordsForNumber(remainder)}` : '';
    return `${thousandsToWords[thousands]}${remainderPart}`;
  } else {
    return '';
  }
};

const formatCents = (cents: any) => {
  if (cents > 0) {
    return ` e ${getWordsForNumber(cents)} centavos`;
  } else {
    return '';
  }
};

export const currencyFormat2 = (amount: any) => {
  if (amount >= 1 && amount <= 10000) {
    const integerPart = Math.floor(amount);
    const centsPart = Math.round((amount - integerPart) * 100);

    const thousands = Math.floor(integerPart / 1000);
    const remainder = integerPart % 1000;
    const thousandsPart = thousandsToWords[thousands];
    const remainderPart = getWordsForNumber(remainder);
    const separator = remainder > 0 && thousands > 0 ? ' e ' : '';

    const centsText = formatCents(centsPart);

    return `${thousandsPart}${separator}${remainderPart} reais${centsText}`;
  } else {
    return '';
  }
};