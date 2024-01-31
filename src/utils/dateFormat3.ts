const months = [
  'janeiro', 'fevereiro', 'março',
  'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro',
  'outubro', 'novembro', 'dezembro'
];

const numbersToWords = [
  'zero', 'um', 'dois', 'três',
  'quatro', 'cinco', 'seis', 'sete',
  'oito', 'nove', 'dez', 'onze',
  'doze', 'treze', 'catorze', 'quinze',
  'dezesseis', 'dezessete', 'dezoito', 'dezenove',
  'vinte', 'vinte e um', 'vinte e dois', 'vinte e três',
  'vinte e quatro', 'vinte e cinco', 'vinte e seis', 'vinte e sete',
  'vinte e oito', 'vinte e nove', 'trinta', 'trinta e um'
];

const getWordsForNumber = (number: any) => {
  if (number < 20) {
    return numbersToWords[number];
  } else {
    const tens = Math.floor(number / 10);
    const ones = number % 10;
    return ones > 0 ? `${numbersToWords[tens * 10]} e ${numbersToWords[ones]}` : `${numbersToWords[tens * 10]}`;
  }
};

const getWordsForYear = (year: any) => {
  if (year < 100) {
    return getWordsForNumber(year);
  } else {
    const thousands = Math.floor(year / 1000);
    const remainingYear = year % 1000;
    return `${getWordsForNumber(thousands)} mil e ${getWordsForNumber(remainingYear)}`;
  }
};

export const dateFormat3 = (value: any) => {
  const date = new Date(value);
  const day = getWordsForNumber(date.getDate());
  const month = months[date.getMonth()];
  const year = getWordsForYear(date.getFullYear());

  return `${day} de ${month} de ${year}`;
};
